<?php

namespace Database\Seeders;

use App\Models\Note;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Note::factory()->count(20)->create();

    }
}
