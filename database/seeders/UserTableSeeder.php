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
        $user1 = User::create([
            'first_name'      => 'Super',
            'surname'         => 'Admin',
            'email'     => 'admin@123',
            'birth_date'     => '2002-05-17',
            'gender'     => 'Male',
            'profession'     => 'Admin',
            'educational_background'     => 'Admin',
            'password'  => bcrypt('123'),
        ]);

        $user2 = User::create([
            'first_name' => 'Naufal',
            'surname' => 'Rozan',
            'email' => 'naufal@gmail.com',
            'birth_date' => '2002-05-17',
            'gender' => 'Male',
            'profession' => 'Student',
            'educational_background' => "Bachelor's Degree",
            'password' => bcrypt('naufal'),
        ]);

        //get all permissions
        $permissions1 = Permission::all();
        $permissions2 = Permission::whereIn('name', [
            'dashboard.index', 'sus.index', 'surveys.index', 'sus.statistics', 'sus.charts', 'sus.responses', 'sus.export',
            'surveys.index', 'surveys.create', 'surveys.edit', 'surveys.delete' 
            ])->get();

        //get role
        $role1 = Role::find(1);
        $role2 = Role::find(2);

        //assign permission to role
        $role1->syncPermissions($permissions1);
        $role2->syncPermissions($permissions2);

        //assign role to user
        $user1->assignRole($role1);
        $user2->assignRole($role2);
    }
}
