<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('portfolios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->foreignId('template_id')
                ->nullable()
                ->constrained('templates')
                ->onDelete('set null');
            $table->string('slug', 50)
                ->unique();
            $table->string('full_name', 120)
                ->nullable();
            $table->string('role', 120)
                ->nullable();
            $table->string('headline', 255)
                ->nullable();
            $table->text('about')
                ->nullable();
            $table->string('profile_picture_url', 500)
                ->nullable();
            $table->string('email', 255)
                ->nullable();
            $table->string('phone', 30)
                ->nullable();
            $table->string('location', 120)
                ->nullable();
            $table->boolean('is_published')
                ->default(false);
            $table->unsignedBigInteger('view_count')
                ->default(0);
            $table->timestamps();

            $table->unique('user_id');
            $table->index('template_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};
