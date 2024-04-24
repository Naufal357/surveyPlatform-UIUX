<?php

namespace App\Exports;

use App\Models\SurveyResponses;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;

class ResponsesSUSExport implements FromCollection, ShouldAutoSize, WithHeadings, WithStyles, WithEvents
{
    use Exportable;
    protected $survey_id;

    public function __construct($survey_id)
    {
        $this->survey_id = $survey_id;
    }

    public function collection()
    {
        // Mendapatkan data SurveyResponses
        $responses = SurveyResponses::select('first_name', 'surname', 'email', 'birth_date', 'gender', 'profession', 'educational_background', 'created_at', 'response_data')->where('survey_id', $this->survey_id)->get();

        // Memanipulasi data sebelum diekspor
        $formattedResponses = $responses->filter(function ($response) {
            // Menguraikan response_data dari format JSON
            $responseData = json_decode($response['response_data']);

            // Mengambil hanya data "sus" jika tersedia
            return isset($responseData->sus);
        })->map(function ($response) {
            // Menggabungkan first_name dan surname
            $response['Full Name'] = $response['first_name'] . ' ' . $response['surname'];

            // Menguraikan response_data dari format JSON
            $responseData = json_decode($response['response_data']);
            $susData = (array) $responseData->sus;

            // Looping untuk mengambil SUS1 hingga SUS10
            for ($i = 1; $i <= 10; $i++) {
                $response['SUS' . $i] = isset($susData['sus' . $i]) ? $susData['sus' . $i] : null;
            }
dd($response);
            // Hapus kolom first_name, surname, dan response_data
            unset($response['first_name']);
            unset($response['surname']);
            unset($response['response_data']);

            return $response;
        });

        $formattedResponses = $formattedResponses->map(function ($response) {
            return [
                'Full Name' => $response['Full Name'],
                'Email' => $response['email'],
                'Birth Date' => $response['birth_date'],
                'Gender' => $response['gender'],
                'Profession' => $response['profession'],
                'Educational Background' => $response['educational_background'],
                'Created At' => $response['created_at'],
                'SUS1' => $response['SUS1'],
                'SUS2' => $response['SUS2'],
                'SUS3' => $response['SUS3'],
                'SUS4' => $response['SUS4'],
                'SUS5' => $response['SUS5'],
                'SUS6' => $response['SUS6'],
                'SUS7' => $response['SUS7'],
                'SUS8' => $response['SUS8'],
                'SUS9' => $response['SUS9'],
                'SUS10' => $response['SUS10'],
                'SUS Average' => $response['SUS Average'],
            ];
        });
        return $formattedResponses;
    }

    public function headings(): array
    {
        return [
            'Full Name',
            'Email',
            'Birth Date',
            'Gender',
            'Profession',
            'Educational Background',
            'Created At',
            'SUS1',
            'SUS2',
            'SUS3',
            'SUS4',
            'SUS5',
            'SUS6',
            'SUS7',
            'SUS8',
            'SUS9',
            'SUS10',
            'SUS Score',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        $styles = [];
        $collection = $this->collection();
        $totalRows = count($collection);

        // Mengatur warna header menjadi coklat
        $styles[1] = [
            'font' => ['bold' => true],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => 'cc6633']],
        ];

        $fillColor1 = 'FFFFFF';
        $fillColor2 = 'D3D3D3';

        for ($rowNumber = 2; $rowNumber <= $totalRows + 1; $rowNumber++) {
            $fillColor = ($rowNumber % 2 == 0) ? $fillColor1 : $fillColor2;
            $styles[$rowNumber] = ['fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => $fillColor]]];
        }

        return $styles;
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                // Mendapatkan sheet
                $sheet = $event->sheet;
                // Mendapatkan total baris dalam data
                $totalRows = count($this->collection());

                $sheet->setCellValue('Q' . ($totalRows + 2), 'Hasil SUS Rata-rata');
                $resultTitleCell = $sheet->getCell('Q' . ($totalRows + 2));
                $resultTitleCell->getStyle()->getFont()->setBold(true);

                // Hitung rata-rata SUS
                $averageSUSFormula = '=AVERAGE(R2:R' . ($totalRows + 1) . ')';
                // Menambahkan rata-rata SUS di akhir data
                $sheet->setCellValue('R' . ($totalRows + 2), $averageSUSFormula);
                // Mendapatkan sel rata-rata SUS
                $averageSUSCell = $sheet->getCell('R' . ($totalRows + 2));

                $averageSUSCell->getStyle()->getFont()->setBold(true);
                $averageSUSCell->getStyle()->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setRGB('cc6633');
            },
            AfterSheet::class => function (AfterSheet $event) {
                // Mendapatkan sheet
                $sheet = $event->sheet;
                // Mendapatkan total baris dalam data
                $totalRows = count($this->collection());

                // Menambahkan rumus rata-rata SUS ke setiap baris pada kolom "SUS Average"
                for ($rowNumber = 2; $rowNumber <= $totalRows + 1; $rowNumber++) {
                    $averageSUSFormula = '=(((H' . $rowNumber . '-1)+(5-I' . $rowNumber . ')+(J' . $rowNumber . '-1)+(5-K' . $rowNumber . ')+(L' . $rowNumber . '-1)+(5-M' . $rowNumber . ')+(N' . $rowNumber . '-1)+(5-O' . $rowNumber . ')+(P' . $rowNumber . '-1)+(5-Q' . $rowNumber . '))*2.5)';
                    $sheet->setCellValue('R' . $rowNumber, $averageSUSFormula);
                }

                $sheet->setCellValue('Q' . ($totalRows + 2), 'Hasil SUS Rata-rata');
                $resultTitleCell = $sheet->getCell('Q' . ($totalRows + 2));
                $resultTitleCell->getStyle()->getFont()->setBold(true);

                // Hitung rata-rata SUS di akhir data
                $sheet->setCellValue('R' . ($totalRows + 2), '=AVERAGE(R2:R' . ($totalRows + 1) . ')');
                // Mendapatkan sel rata-rata SUS
                $averageSUSCell = $sheet->getCell('R' . ($totalRows + 2));

                $averageSUSCell->getStyle()->getFont()->setBold(true);
                $averageSUSCell->getStyle()->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setRGB('cc6633');
            },
        ];
    }
}
