<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\Survey;
use App\Models\SurveyResponses;

class FormController extends Controller
{
    public function index()
    {
        return inertia('Form', [
            'auth' => auth()->user(),
        ]);
    }

    public function show($id)
    {
        // Mengambil data dari model berdasarkan ID
        $surveys = Survey::findOrFail($id);

        // Menampilkan halaman detail dengan menggunakan Inertia
        return inertia('Form', [
            'surveys' => $surveys,
            'auth' => auth()->user(),
        ]);
    }


    public function storeData(Request $request)
    {
        // Validasi data yang diterima dari formulir
        $validatedData = $request->validate([
            'survey_id'             => 'required|exists:surveys,id',
            'first_name'             => 'required',
            'last_name'              => 'required',
            'email'                 => 'required|email',
            'age'                   => 'required|numeric',
            'gender'                => 'required',
            'profession'            => 'required',
            'educational_background' => 'required',
            'response_data'        => 'required|json', // Validasi untuk responses_data sebagai JSON
        ]);

        // Ambil nilai dari sus1 hingga sus10
        $responseData = [
            'sus1' => $request->input('sus1'),
            'sus2' => $request->input('sus2'),
            'sus3' => $request->input('sus3'),
            'sus4' => $request->input('sus4'),
            'sus5' => $request->input('sus5'),
            'sus6' => $request->input('sus6'),
            'sus7' => $request->input('sus7'),
            'sus8' => $request->input('sus8'),
            'sus9' => $request->input('sus9'),
            'sus10' => $request->input('sus10'),
        ];

        // dd($validatedData);

        // Simpan data ke dalam database
        $surveyResponse = SurveyResponses::create($validatedData);

        // Redirect atau berikan respons sesuai kebutuhan Anda
        return redirect('/')->with('status', 'Pengisian Survey Berhasil!');
    }

}