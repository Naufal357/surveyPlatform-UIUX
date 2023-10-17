<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserTableSeeder extends Seeder
{
    public function run()
    {
        //create user
        $user = User::create([
            'first_name'      => 'Super',
            'surname'         => 'Admin',
            'email'     => 'admin@123',
            'birth_date'     => '2002-05-17',
            'gender'     => 'Male',
            'profession'     => 'Admin',
            'educational_background'     => 'Admin',
            'password'  => bcrypt('123'),
        ]);

        //get all permissions
        $permissions = Permission::all();

        //get role admin
        $role = Role::find(1);

        //assign permission to role
        $role->syncPermissions($permissions);

        //assign role to user
        $user->assignRole($role);
    }
}
