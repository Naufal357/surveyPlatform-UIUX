<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function __invoke()
    {
        $permissions = Permission::when(request()->q, function ($permissions) {
            $permissions = $permissions->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(20);

        $permissions->appends(['q' => request()->q]);

        return inertia('Account/Permissions', [
            'permissions' => $permissions
        ]);
    }
}
