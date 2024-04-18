<?php

namespace App\Http\Controllers\Account;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Models\CertificateHasCategorys;
use App\Models\Category;
use App\Models\User;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::with('user')
        ->when(request()->q, function ($query) {
            $query->where('name', 'like', '%' . request()->q . '%');
        })
            ->latest()
            ->paginate(8);

        $certificates->appends(['q' => request()->q]);

        $categories = Category::all();

        $pendingCertificates = $certificates->where('status', 'pending');
        $approvedCertificates = $certificates->where('status', 'approved');

        return inertia('Account/Certificates', [
            'pendingCertificates' => $pendingCertificates,
            'approvedCertificates' => $approvedCertificates,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request, CertificateHasCategorys $certificateHasCategorys, Certificate $certificate)
    {
        $this->validate($request, [
            'certificateId' => 'required',
            'certCategories' => 'required',
        ]);

        foreach ($request->certCategories as $certCategory) {
            $certificateHasCategorys->create([
                'certificate_id' => $request->certificateId,
                'category_id' => $certCategory
            ]);
        };

        $certificate->where('id', $request->certificateId)->update([
            'status' => 'approved'
        ]);
    }

    public function destroy($id)
    {
        $certificate = Certificate::findOrFail($id);
        $certificate->delete();
        return redirect()->route('account.certificates.index');
    }
}
