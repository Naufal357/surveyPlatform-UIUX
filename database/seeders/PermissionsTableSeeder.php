<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //permission dashboard
        Permission::create(['name' => 'dashboard.index', 'guard_name' => 'web']);

        //permission sus result
        Permission::create(['name' => 'sus.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'sus.statistics', 'guard_name' => 'web']);
        Permission::create(['name' => 'sus.charts', 'guard_name' => 'web']);
        Permission::create(['name' => 'sus.responses', 'guard_name' => 'web']);
        Permission::create(['name' => 'sus.export', 'guard_name' => 'web']);

        //permission surveys
        Permission::create(['name' => 'surveys.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'surveys.index.full', 'guard_name' => 'web']);
        Permission::create(['name' => 'surveys.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'surveys.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'surveys.delete', 'guard_name' => 'web']);

        //permission roles
        Permission::create(['name' => 'roles.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles.delete', 'guard_name' => 'web']);

        //permission permissions
        Permission::create(['name' => 'permissions.index', 'guard_name' => 'web']);

        //permission users
        Permission::create(['name' => 'users.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.create', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'users.delete', 'guard_name' => 'web']);
    }
}
