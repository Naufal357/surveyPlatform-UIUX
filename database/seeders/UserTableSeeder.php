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
        $user1 = User::create([
            'first_name'      => 'Super',
            'surname'         => 'Admin',
            'email'     => 'admin@123',
            'birth_date'     => '2002-05-17',
            'gender'     => 'Male',
            'profession'     => 'Super Admin',
            'educational_background'     => 'Super Admin',
            'password'  => bcrypt('123'),
        ]);

        $user2 = User::create([
            'first_name' => 'Naufal',
            'surname' => 'Admin',
            'email' => 'naufal@123',
            'birth_date' => '2002-05-17',
            'gender' => 'Male',
            'profession' => 'Student',
            'educational_background' => "Bachelor's Degree",
            'password' => bcrypt('123'),
        ]);

        $user3 = User::create([
            'first_name' => 'Rozan',
            'surname' => 'User',
            'email' => 'rozan@123',
            'birth_date' => '2002-05-17',
            'gender' => 'Male',
            'profession' => 'Student',
            'educational_background' => "Bachelor's Degree",
            'password' => bcrypt('123'),
        ]);

        $permissions1 = Permission::all();
        $permissions2 = Permission::whereNotIn('name', [
            'roles.index', 'roles.edit', 'roles.create', 'roles.delete', 'roles.index.full', 'permissions.index',
            'users.index', 'users.delete', 'users.edit', 'users.create',
        ])->get();
        $permissions3 = Permission::whereIn('name', [
            'dashboard.index', 'sus.index', 'surveys.index', 'sus.statistics', 'sus.charts', 'sus.responses', 'sus.export',
            'surveys.index', 'surveys.create', 'surveys.edit', 'surveys.delete'
        ])->get();

        $role1 = Role::find(1);
        $role2 = Role::find(2);
        $role3 = Role::find(3);

        $role1->syncPermissions($permissions1);
        $role2->syncPermissions($permissions2);
        $role3->syncPermissions($permissions3);

        $user1->assignRole($role1);
        $user2->assignRole($role2);
        $user3->assignRole($role3);
    }
}
