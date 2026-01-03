# UAS-MATA-KULIAH-AI
Digunakan untuk mengumpulkan berbagai file terkait projek akhir semester untuk mata kuliah AI ITB YADIKA Pasuruan 2026 oleh Dewa Almuhyiddin STI A Semester 5 dengan NIM 23121013

📘 AI Customer Service – Website Literasi Psikologi & Filsafat
📌 Deskripsi Project

Project ini merupakan aplikasi web statis yang mengintegrasikan Artificial Intelligence (AI) sebagai Customer Service pada sebuah website startup literasi yang berfokus pada psikologi, filsafat, dan kesehatan mental.

Integrasi AI dilakukan menggunakan n8n workflow automation sebagai orchestration layer, sehingga aplikasi frontend tetap ringan, aman, dan tidak bergantung langsung pada API AI.

Project ini dikembangkan sebagai tugas Ujian Akhir Semester (UAS) dengan tujuan utama “Integrate Application with AI”.

🎯 Tujuan Pengembangan

Mengintegrasikan AI ke dalam aplikasi web statis

Membangun AI Customer Service berbasis knowledge internal

Menerapkan alur pemrosesan AI yang terstruktur

Menggunakan n8n sebagai penghubung antara frontend dan AI

Menyediakan layanan informasi yang edukatif dan etis

🧠 Fitur Utama

Website statis (HTML, CSS, JavaScript)

Halaman Bantuan dengan AI Customer Service

Integrasi AI menggunakan n8n workflow

Klasifikasi pertanyaan pengguna

Knowledge-based AI response

Fallback ke mode chat AI jika data tidak ditemukan

Pencatatan data pendaftaran melalui Airtable

🗂️ Struktur Folder
/landing page
/about us
/bantuan
/form pendaftaran
/img

Folder bantuan

index.html → Tampilan AI Customer Service

chat.js → Logic komunikasi ke webhook n8n

style.css → Styling halaman bantuan

🧩 Teknologi yang Digunakan

HTML

CSS

JavaScript

n8n (Workflow Automation)

Airtable (Knowledge Base & New Data)

AI Provider (Groq API)

Webhook (Integrasi Frontend ke AI)

🔄 Arsitektur & Workflow AI
Alur Singkat:
User Input
 → Webhook n8n
 → Parsing Input
 → Klasifikasi Pertanyaan
 → Knowledge Search / Chat AI
 → Format Response
 → Output ke User


Workflow ini memastikan AI:

Tidak menjawab secara acak

Menggunakan data internal sebagai acuan

Memberikan jawaban yang relevan dan konsisten

📚 Knowledge Base

Knowledge Base disimpan menggunakan Airtable dengan struktur:

ID

Question

Answer

Keywords

Knowledge Base digunakan sebagai acuan utama AI agar respon yang diberikan sesuai dengan domain literasi psikologi, filsafat, dan program yang tersedia.

📝 New Data (Pendaftaran)

Selain Knowledge Base, Airtable juga digunakan untuk menyimpan data baru seperti:

Permintaan pendaftaran program

Pendaftaran seminar / webinar

Data interaksi penting pengguna

Penyimpanan data dilakukan secara otomatis melalui workflow n8n tanpa menggunakan database backend.

🧪 Pengujian

Pengujian dilakukan dengan memberikan beberapa pertanyaan kepada AI Customer Service melalui halaman Bantuan, meliputi:

Pertanyaan psikologi

Pertanyaan literasi / program

Pertanyaan umum (fallback)

Hasil pengujian menunjukkan AI mampu memberikan respon yang relevan, kontekstual, dan sesuai dengan knowledge yang tersedia.

⚠️ Etika & Batasan AI

AI Customer Service pada aplikasi ini berfungsi sebagai pendamping literasi dan informasi awal, bukan sebagai pengganti tenaga profesional kesehatan mental.

AI tidak memberikan diagnosis medis dan hanya bersifat edukatif.

📄 Dokumentasi Lengkap

Dokumentasi teknis yang lebih lengkap, termasuk:

Penjelasan workflow n8n

Struktur Knowledge Base & New Data

Screenshot implementasi

Hasil pengujian AI

📌 tersedia pada file dokumentasi dalam format PDF yang disertakan terpisah.

👤 Identitas Pengembang

Nama: Dewa Almuhyiddin
NIM: 23121013
Kelas: STI-A
Mata Kuliah: Manajemen Jaringan

🏁 Penutup

Project ini menunjukkan implementasi nyata integrasi AI ke dalam aplikasi web statis dengan pendekatan yang terstruktur, etis, dan sesuai dengan tujuan pembelajaran mata kuliah.
