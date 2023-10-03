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

class ResponsesExport implements FromCollection, ShouldAutoSize, WithHeadings, WithStyles
{
    use Exportable;
    protected $survey_id;

    public function __construct($survey_id)
    {
        $this->survey_id = $survey_id;
    }

    private function calculateSUS($responseData)
    {
        $susScore = 0;
        $susScore += $responseData['SUS1'] - 1;
        $susScore += 5 - $responseData['SUS2'];
        $susScore += $responseData['SUS3'] - 1;
        $susScore += 5 - $responseData['SUS4'];
        $susScore += $responseData['SUS5'] - 1;
        $susScore += 5 - $responseData['SUS6'];
        $susScore += $responseData['SUS7'] - 1;
        $susScore += 5 - $responseData['SUS8'];
        $susScore += $responseData['SUS9'] - 1;
        $susScore += 5 - $responseData['SUS10'];

        return $susScore * 2.5; // Mengubah skala SUS menjadi 0-100
    }

    public function collection()
    {
        // Mendapatkan data SurveyResponses
        $responses = SurveyResponses::select('first_name', 'last_name', 'email', 'age', 'gender', 'profession', 'educational_background', 'created_at', 'response_data')->where('survey_id', $this->survey_id)->get();

        // Memanipulasi data sebelum diekspor
        $formattedResponses = $responses->map(function ($response) {
            // Menggabungkan first_name dan last_name
            $response['Full Name'] = $response['first_name'] . ' ' . $response['last_name'];

            // Menguraikan response_data dari format JSON ke kolom SUS1 hingga SUS10 jika tersedia
            $responseData = json_decode($response['response_data']);
            for ($i = 1; $i <= 10; $i++) {
                $response['SUS' . $i] = isset($responseData->{'sus' . $i}) ? $responseData->{'sus' . $i} : null;
            }

            // Hitung rata-rata SUS
            $susAverage = $this->calculateSUS($response);
            $response['SUS Average'] = $susAverage;

            // Hapus kolom first_name dan last_name
            unset($response['first_name']);
            unset($response['last_name']);
            return $response;
        });


        $formattedResponses = $formattedResponses->map(function ($response) {
            return [
                'Full Name' => $response['Full Name'],
                'Email' => $response['email'],
                'Age' => $response['age'],
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
            'Age',
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
            'SUS Average',
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
}
