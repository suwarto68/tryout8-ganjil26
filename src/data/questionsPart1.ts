import { Question } from '../types/quiz';

export const QUESTIONS_PART_1: Question[] = [
  // ==================== 1. BILANGAN BERPANGKAT (Q01 - Q07) ====================
  {
    id: 'Q01',
    number: 1,
    topic: 'pangkat',
    topicLabel: 'Bilangan Berpangkat',
    type: 'PG',
    competency: 'Memahami',
    difficultyWeight: 1,
    isListeningFocus: true,
    stimulusTitle: 'Pembibitan Eceng Gondok & Azolla di Kolam IPA SMPN 1 Wanaraya',
    readingPassage:
      'Siswa kelas delapan SMPN 1 Wanaraya melakukan pengamatan pertumbuhan tanaman air Azolla di kolam praktik IPA sekolah untuk bahan pupuk organik kebun sayur. Pada hari pertama pengamatan, Pak Budi mencatat terdapat dua kelompok koloni Azolla sehat di sudut kolam. Setiap kali memasuki hari baru, setiap koloni tersebut membelah diri menjadi dua kali lipat dari jumlah hari sebelumnya. Pengamatan berlangsung teratur selama lima hari berturut-turut tanpa ada tanaman yang dipanen terlebih dahulu. Siswa diminta mencatat pola perkalian berulang jumlah koloni agar dapat memahami konsep dasar bilangan berpangkat secara nyata dari lingkungan sekitar Wanaraya.',
    visual: {
      kind: 'bar_chart',
      title: 'Grafik Jumlah Koloni Azolla di Kolam SMPN 1 Wanaraya',
      subtitle: 'Pengamatan Hari ke-1 hingga Hari ke-5 (pembelahan ×2 per hari)',
      yAxisLabel: 'Jumlah Koloni',
      data: [
        { label: 'Hari 1', value: 2, unit: 'koloni' },
        { label: 'Hari 2', value: 4, unit: 'koloni' },
        { label: 'Hari 3', value: 8, unit: 'koloni' },
        { label: 'Hari 4', value: 16, unit: 'koloni' },
        { label: 'Hari 5', value: 32, unit: 'koloni', highlight: true },
      ],
    },
    prompt:
      'Berdasarkan grafik dan bacaan di atas, bentuk bilangan berpangkat yang paling tepat menyatakan jumlah koloni Azolla pada Hari ke-5 adalah ....',
    options: ['2⁵', '5²', '2 × 5', '2⁴'],
    correctIndex: 0,
    feedbackCorrect:
      'Hebat! Jawabanmu tepat sekali. Pada Hari ke-1 jumlahnya 2¹ = 2, lalu terus dikali 2 setiap hari hingga Hari ke-5 menjadi 2 × 2 × 2 × 2 × 2 = 2⁵ = 32 koloni.',
    feedbackIncorrect:
      'Tetap semangat! Perhatikan makna kata "membelah diri menjadi dua kali lipat setiap hari". Artinya bilangan pokoknya adalah 2 dan dikalikan berulang sebanyak 5 kali (Hari 1 sampai Hari 5), bukan 5² (5 × 5) ataupun 2 × 5. Jadi bentuk pangkat yang benar adalah 2⁵ = 32.',
  },
  {
    id: 'Q02',
    number: 2,
    topic: 'pangkat',
    topicLabel: 'Bilangan Berpangkat',
    type: 'PG',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Kapasitas Gudang Benih Padi Koperasi Desa Kolam Kanan',
    readingPassage:
      'Menjelang musim tanam di Kecamatan Wanaraya, Koperasi Tani Makmur Desa Kolam Kanan menata stok benih padi unggul lokal jenis Siam Unus di ruang penyimpanan. Setiap rak besi memiliki kapasitas muatan tetap agar karung benih tetap kering dari kelembapan tanah rawa. Pengurus koperasi menata delapan blok penyimpanan besar, di mana setiap blok berisi delapan rak, dan setiap rak menampung delapan karung benih padi. Untuk mempermudah pelaporan kepada penyuluh pertanian kecamatan, bendahara koperasi ingin menyederhanakan perhitungan total karung benih ke dalam bentuk perpangkatan berbasis bilangan dua agar lebih ringkas dan mudah diperiksa.',
    visual: {
      kind: 'infographic_cards',
      title: 'Infografis Penyimpanan Benih Koperasi Kolam Kanan',
      subtitle: 'Struktur penataan stok benih padi siap tanam Wanaraya',
      facts: [
        { label: 'Jumlah Blok', value: '8 blok', note: '8 = 2³' },
        { label: 'Rak per Blok', value: '8 rak', note: '8 = 2³' },
        { label: 'Karung per Rak', value: '8 karung', note: '8 = 2³' },
      ],
      sourceNote: 'Data inventaris Koperasi Tani Makmur Wanaraya',
    },
    prompt:
      'Total seluruh karung benih padi yang tersimpan di gudang Koperasi Kolam Kanan jika dinyatakan dalam bentuk perpangkatan berbasis 2 adalah ....',
    options: ['2⁶ karung', '2⁹ karung', '2²⁷ karung', '3⁸ karung'],
    correctIndex: 1,
    feedbackCorrect:
      'Luar biasa! Kamu berhasil menerapkan sifat perkalian bilangan berpangkat: 8 × 8 × 8 = 2³ × 2³ × 2³ = 2³⁺³⁺³ = 2⁹ = 512 karung.',
    feedbackIncorrect:
      'Yuk cermati lagi! Kata kunci "setiap blok berisi 8 rak, dan setiap rak menampung 8 karung" berarti operasi hitungnya adalah perkalian: 8 × 8 × 8. Karena 8 = 2³, maka 2³ × 2³ × 2³ pangkatnya dijumlahkan (3 + 3 + 3 = 9), bukan dikalikan (3 × 3 × 3). Jawaban yang benar adalah 2⁹.',
  },
  {
    id: 'Q03',
    number: 3,
    topic: 'pangkat',
    topicLabel: 'Bilangan Berpangkat',
    type: 'PG',
    competency: 'Menalar',
    difficultyWeight: 3,
    stimulusTitle: 'Efisiensi Saluran Irigasi Handil Kebun Jeruk Wanaraya',
    readingPassage:
      'Petani jeruk Siam di Desa Simpang Jaya Wanaraya memantau debit air saluran irigasi handil saat pasang surut sungai. Pada pagi hari, pompa air bertenaga surya milik kelompok tani mampu mengalirkan air sebesar 4⁶ mililiter setiap menit ke bak penampungan utama. Dari bak utama, air dibagi rata melalui 8 pipa cabang menuju petak kebun jeruk agar kelembapan akar terjaga merata. Ketua kelompok tani ingin mengetahui volume air yang keluar dari setiap pipa cabang per menitnya. Dengan mengubah seluruh bilangan menjadi pangkat berbasis dua, perhitungan pembagian debit air dapat diselesaikan dengan cepat tanpa kalkulator.',
    visual: {
      kind: 'infographic_cards',
      title: 'Infografis Distribusi Debit Air Irigasi Simpang Jaya',
      subtitle: 'Pembagian aliran air dari bak utama ke pipa cabang kebun jeruk',
      facts: [
        { label: 'Debit Bak Utama', value: '4⁶ mL/menit', note: 'Ubah basis 4 = 2²' },
        { label: 'Jumlah Pipa Cabang', value: '8 pipa', note: 'Ubah basis 8 = 2³' },
        { label: 'Debit per Pipa', value: '4⁶ ÷ 8', note: 'Dibagi rata' },
      ],
      sourceNote: 'Catatan Kelompok Tani Jeruk Simpang Jaya, Wanaraya',
    },
    prompt:
      'Debit air yang keluar dari setiap pipa cabang per menit adalah ....',
    options: ['2⁴ mL/menit', '2⁶ mL/menit', '2⁹ mL/menit', '2¹⁵ mL/menit'],
    correctIndex: 2,
    feedbackCorrect:
      'Mantap sekali penalaranmu! 4⁶ = (2²)⁶ = 2¹², sedangkan 8 = 2³. Maka 2¹² ÷ 2³ = 2¹²⁻³ = 2⁹ = 512 mL/menit.',
    feedbackIncorrect:
      'Hampir tepat, mari perhatikan konversi basisnya! Pada kalimat "4⁶ dibagi rata melalui 8 pipa", ubah dulu 4 menjadi 2² sehingga 4⁶ = (2²)⁶ = 2¹², dan 8 = 2³. Pada pembagian pangkat berbasis sama, pangkatnya dikurangi (12 − 3 = 9), sehingga hasilnya 2⁹ mL/menit.',
  },
  {
    id: 'Q04',
    number: 4,
    topic: 'pangkat',
    topicLabel: 'Bilangan Berpangkat',
    type: 'MCMA',
    competency: 'Memahami',
    difficultyWeight: 1,
    stimulusTitle: 'Inventarisasi Bibit Pohon Ulin & Galam di Taman Sekolah',
    readingPassage:
      'Dalam rangka program Adiwiyata di SMPN 1 Wanaraya, OSIS mendata bantuan bibit pohon lokal seperti ulin dan galam untuk penghijauan tepi lapangan sekolah. Data bantuan dicatat dalam tabel kode perpangkatan agar siswa kelas delapan terbiasa membaca notasi pangkat bulat positif, pangkat nol, dan pangkat negatif. Setiap kode menyatakan jumlah bibit atau ukuran pot penyemaian dalam satuan tertentu. Pembina OSIS meminta perwakilan kelas 8A dan 8B memeriksa kembali kesesuaian nilai asli dari beberapa catatan perpangkatan yang tertulis di papan pengumuman sekolah sebelum laporan diserahkan ke kepala sekolah.',
    visual: {
      kind: 'bar_chart',
      title: 'Rekap Kode Bantuan Bibit Adiwiyata SMPN 1 Wanaraya',
      subtitle: 'Perbandingan nilai dari beberapa kode pangkat pada papan data',
      yAxisLabel: 'Nilai Sebenarnya',
      data: [
        { label: '3⁴', value: 81, unit: 'bibit' },
        { label: '5²', value: 25, unit: 'bibit' },
        { label: '2⁵', value: 32, unit: 'bibit' },
        { label: '7⁰', value: 1, unit: 'paket' },
      ],
    },
    prompt:
      'Pilih semua pernyataan matematika yang BENAR terkait sifat bilangan berpangkat pada data OSIS di atas! (Pilih lebih dari satu jawaban benar)',
    statements: [
      'Nilai 7⁰ sama dengan 1 karena setiap bilangan bukan nol berpangkat nol bernilai 1.',
      'Bentuk 3⁻² memiliki nilai yang sama dengan 1/9.',
      'Hasil dari 2⁵ × 2³ sama dengan 2¹⁵.',
      'Nilai dari (2³)² sama dengan 2⁶ = 64.',
    ],
    correctIndices: [0, 1, 3],
    feedbackCorrect:
      'Cerdas! Ketiga pernyataan yang kamu pilih benar: a⁰ = 1 (untuk a ≠ 0), a⁻ⁿ = 1/aⁿ sehingga 3⁻² = 1/9, dan (aᵐ)ⁿ = aᵐˣⁿ sehingga (2³)² = 2⁶ = 64.',
    feedbackIncorrect:
      'Mari kita telaah maknanya bersama! Ingat sifat pangkat: perkalian pangkat berbasis sama (2⁵ × 2³) berarti eksponennya DIJUMLAHKAN menjadi 2⁸, bukan dikalikan menjadi 2¹⁵. Sedangkan 7⁰ = 1, 3⁻² = 1/9, dan (2³)² = 2⁶ = 64 adalah pernyataan yang benar.',
  },
  {
    id: 'Q05',
    number: 5,
    topic: 'pangkat',
    topicLabel: 'Bilangan Berpangkat',
    type: 'MCMA',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Panen Keranjang Jeruk Siam Desa Roham Raya',
    readingPassage:
      'Musim panen jeruk Siam di Desa Roham Raya, Kecamatan Wanaraya berlangsung meriah pada pertengahan tahun ini. Setiap hari, kelompok tani mencatat hasil panen dalam satuan keranjang yang diangkut menggunakan perahu kelotok melewati saluran handil menuju pasar desa. Pak Hasan mencatat pengiriman hari Senin sebanyak 3⁴ keranjang dan hari Selasa sebanyak 3⁵ keranjang. Sementara itu, kelompok tani tetangga dari Desa Sidomulyo mengirimkan 9² keranjang pada hari Rabu. Untuk membuat grafik rekapitulasi mingguan di balai desa, petugas pendataan perlu menyamakan bentuk bilangan berpangkat agar mudah membandingkan total kiriman antarhari.',
    visual: {
      kind: 'bar_chart',
      title: 'Pengiriman Jeruk Siam Wanaraya (dalam Keranjang)',
      subtitle: 'Perbandingan volume pengiriman Senin, Selasa, dan Rabu',
      yAxisLabel: 'Jumlah Keranjang',
      data: [
        { label: 'Senin (3⁴)', value: 81, unit: 'krj' },
        { label: 'Selasa (3⁵)', value: 243, unit: 'krj', highlight: true },
        { label: 'Rabu (9²)', value: 81, unit: 'krj' },
      ],
    },
    prompt:
      'Berdasarkan data panen jeruk Wanaraya tersebut, pilihlah pernyataan-pernyataan yang BENAR!',
    statements: [
      'Jumlah kiriman hari Senin sama banyak dengan kiriman hari Rabu karena 3⁴ = 9² = 81.',
      'Selisih kiriman hari Selasa dan hari Senin adalah 162 keranjang.',
      'Perbandingan kiriman hari Selasa terhadap hari Senin adalah 3 : 1.',
      'Total seluruh kiriman selama tiga hari tersebut adalah 3¹¹ keranjang.',
    ],
    correctIndices: [0, 1, 2],
    feedbackCorrect:
      'Keren! Kamu teliti membaca data dan sifat pangkat: 9² = (3²)² = 3⁴ = 81, selisih 243 − 81 = 162, dan 3⁵ ÷ 3⁴ = 3¹ = 3 banding 1.',
    feedbackIncorrect:
      'Perhatikan perbedaan penjumlahan dan perkalian pangkat! Total kiriman 3 hari adalah penjumlahan 81 + 243 + 81 = 405 keranjang, BUKAN perkalian pangkat (3⁴ × 3⁵ × 9²). Sedangkan pernyataan 1, 2, dan 3 bernilai benar.',
  },
  {
    id: 'Q06',
    number: 6,
    topic: 'pangkat',
    topicLabel: 'Bilangan Berpangkat',
    type: 'BS',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Laju Pertumbuhan Jamur Tiram Siswa Ekstrakurikuler',
    readingPassage:
      'Ekstrakurikuler Kewirausahaan SMPN 1 Wanaraya membudidayakan jamur tiram putih di rumah kumbung bambu belakang sekolah. Pada pengamatan mikroskopis di laboratorium IPA, siswa mengamati spora jamur yang berkembang dalam media tanam serbuk kayu ulin. Awalnya terdapat 1.000 spora yang aktif membelah setiap dua jam menjadi dua kali lipat. Guru pembina menuliskan rumus perkiraan jumlah spora setelah t jam sebagai N = 1.000 × 2<sup>t/2</sup>. Siswa kelas delapan diminta menguji kebenaran beberapa pernyataan perhitungan jumlah spora untuk waktu pengamatan 4 jam, 6 jam, dan perbandingan kondisi awal.',
    visual: {
      kind: 'line_chart',
      title: 'Grafik Pertumbuhan Spora Jamur Tiram (×1.000)',
      subtitle: 'Kenaikan jumlah spora setiap 2 jam pada media kumbung SMPN 1 Wanaraya',
      yAxisLabel: 'Ribuan Spora',
      data: [
        { label: '0 Jam', value: 1, unit: 'rb' },
        { label: '2 Jam', value: 2, unit: 'rb' },
        { label: '4 Jam', value: 4, unit: 'rb' },
        { label: '6 Jam', value: 8, unit: 'rb', highlight: true },
        { label: '8 Jam', value: 16, unit: 'rb' },
      ],
    },
    prompt:
      'Tentukan apakah masing-masing pernyataan berikut BENAR atau SALAH berdasarkan rumus dan grafik pertumbuhan spora!',
    statements: [
      'Setelah 4 jam, jumlah spora menjadi 1.000 × 2² = 4.000 spora.',
      'Setelah 6 jam, jumlah spora menjadi 6.000 spora.',
      'Pada jam ke-8, jumlah spora mencapai 16 kali lipat dari jumlah awal.',
    ],
    correctBooleans: [true, false, true],
    feedbackCorrect:
      'Tepat sekali! Pada jam ke-4: 1.000 × 2<sup>4/2</sup> = 1.000 × 2² = 4.000 (Benar). Pada jam ke-6: 1.000 × 2³ = 8.000, bukan 6.000 (Salah). Pada jam ke-8: 2⁴ = 16 kali lipat (Benar).',
    feedbackIncorrect:
      'Coba periksa kembali pangkatnya! Kata "setiap 2 jam menjadi dua kali lipat" membentuk pola eksponen 2<sup>t/2</sup>, bukan perkalian biasa 1.000 × t. Maka pada t = 6 jam, hasilnya 1.000 × 2³ = 8.000 spora (bukan 6.000).',
  },
  {
    id: 'Q07',
    number: 7,
    topic: 'pangkat',
    topicLabel: 'Bilangan Berpangkat',
    type: 'BS',
    competency: 'Menalar',
    difficultyWeight: 3,
    stimulusTitle: 'Perbandingan Luas Tambak Ikan Patin Desa Surya Kanta',
    readingPassage:
      'Warga Desa Surya Kanta, Kecamatan Wanaraya memanfaatkan lahan rawa untuk membuat dua petak kolam ikan patin berbentuk persegi. Kolam pertama berukuran panjang sisi 2⁴ meter, sedangkan kolam kedua dirancang lebih luas dengan panjang sisi 2⁵ meter untuk pembesaran ikan. Pak RT ingin memasang jaring pembatas sekaligus menghitung luas permukaan air kedua kolam guna menentukan takaran pakan pelet harian yang tepat. Sebelum membeli benih ikan dan pakan di koperasi Wanaraya, warga menelaah pernyataan perbandingan luas dan keliling kedua kolam persegi tersebut dengan menggunakan sifat-sifat perpangkatan.',
    visual: {
      kind: 'infographic_cards',
      title: 'Infografis Dimensi Kolam Ikan Patin Surya Kanta',
      subtitle: 'Perbandingan dua kolam berbentuk persegi',
      facts: [
        { label: 'Sisi Kolam I', value: '2⁴ m', note: '16 meter' },
        { label: 'Sisi Kolam II', value: '2⁵ m', note: '32 meter' },
        { label: 'Rumus Luas', value: 's × s = s²', note: 'Persegi' },
      ],
      sourceNote: 'Data Kelompok Budidaya Ikan Surya Kanta, Wanaraya',
    },
    prompt:
      'Tentukan nilai kebenaran (BENAR / SALAH) dari setiap pernyataan perbandingan dua kolam ikan tersebut!',
    statements: [
      'Luas Kolam I jika ditulis dalam bentuk pangkat basis 2 adalah 2⁸ m².',
      'Luas Kolam II adalah dua kali lipat dari luas Kolam I.',
      'Selisih luas Kolam II dan Kolam I adalah 768 m².',
    ],
    correctBooleans: [true, false, true],
    feedbackCorrect:
      'Analisismu tajam! Luas Kolam I = (2⁴)² = 2⁸ = 256 m² (Benar). Luas Kolam II = (2⁵)² = 2¹⁰ = 1.024 m², yaitu 4 kali lipat Kolam I, bukan 2 kali (Salah). Selisihnya 1.024 − 256 = 768 m² (Benar).',
    feedbackIncorrect:
      'Hati-hati pada konsep luas persegi! Jika panjang sisi menjadi 2 kali lipat (dari 2⁴ menjadi 2⁵), maka luasnya menjadi 2² = 4 kali lipat (dari 2⁸ = 256 m² menjadi 2¹⁰ = 1.024 m²), bukan 2 kali lipat. Selisih keduanya memang 1.024 − 256 = 768 m².',
  },

  // ==================== 2. BILANGAN AKAR (Q08 - Q14) ====================
  {
    id: 'Q08',
    number: 8,
    topic: 'akar',
    topicLabel: 'Bilangan Akar',
    type: 'PG',
    competency: 'Memahami',
    difficultyWeight: 1,
    isListeningFocus: true,
    stimulusTitle: 'Taman Baca Persegi di Halaman SMPN 1 Wanaraya',
    readingPassage:
      'Sekolah SMPN 1 Wanaraya baru saja meresmikan pojok taman baca terbuka yang nyaman di bawah pohon trembesi rindang. Lantai taman baca tersebut dipasangi keramik bersih berbentuk bangun datar persegi tepat dengan luas keseluruhan 196 meter persegi. Untuk menjaga kerapian dan keamanan siswa saat membaca bersama di jam istirahat, tukang bangunan sekolah akan memasang pagar kayu ulin kecil mengelilingi keempat sisi taman baca tersebut. Sebelum memotong batang kayu ulin, siswa kelas delapan diajak menghitung berapa panjang masing-masing sisi taman baca dengan cara menarik akar kuadrat dari luas persegi yang diketahui.',
    visual: {
      kind: 'infographic_cards',
      title: 'Infografis Taman Baca Persegi SMPN 1 Wanaraya',
      subtitle: 'Menentukan panjang sisi dari luas bangun persegi',
      facts: [
        { label: 'Bentuk Lahan', value: 'Persegi', note: 'Keempat sisi sama panjang' },
        { label: 'Luas Lantai', value: '196 m²', note: 'Luas = s²' },
        { label: 'Panjang Sisi', value: '√196 m', note: 'Cari bilangan kuadrat' },
      ],
      sourceNote: 'Denah Sarana Prasarana SMPN 1 Wanaraya',
    },
    prompt:
      'Panjang setiap sisi taman baca persegi di SMPN 1 Wanaraya tersebut adalah ....',
    options: ['12 meter', '13 meter', '14 meter', '16 meter'],
    correctIndex: 2,
    feedbackCorrect:
      'Benar sekali! Karena luas persegi adalah s², maka s = √196 = 14 meter (sebab 14 × 14 = 196).',
    feedbackIncorrect:
      'Belum tepat, tetap semangat! Untuk mencari panjang sisi persegi dari luasnya, kita mencari bilangan yang jika dikalikan dengan dirinya sendiri menghasilkan 196. Perhatikan 12² = 144, 13² = 169, sedangkan 14² = 196. Jadi jawabannya 14 meter.',
  },
  {
    id: 'Q09',
    number: 9,
    topic: 'akar',
    topicLabel: 'Bilangan Akar',
    type: 'PG',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Penataan Kebun Sayur Hidroponik di Desa Kolam Kiri',
    readingPassage:
      'Ibu-ibu PKK Desa Kolam Kiri, Kecamatan Wanaraya menata dua petak kebun sayur sawi dan kangkung di pekarangan balai desa. Petak pertama berbentuk persegi panjang dengan ukuran panjang √75 meter dan lebar √12 meter, yang akan diberi pembatas bambu di sekelilingnya. Agar mudah memesan panjang tali pengikat dan bambu ke toko bangunan di Pasar Wanaraya, pengurus PKK meminta bantuan siswa kelas delapan menyederhanakan ukuran panjang dan lebar tersebut ke dalam bentuk akar paling sederhana. Dengan menyederhanakan bentuk akar terlebih dahulu, keliling maupun perkalian ukuran kebun menjadi jauh lebih mudah dihitung.',
    imagePath: '/src/assets/images/wanaraya_jeruk_scene_1794867845480.jpg',
    visual: {
      kind: 'infographic_cards',
      title: 'Data Ukuran Petak Kebun PKK Desa Kolam Kiri',
      subtitle: 'Sederhanakan bentuk akar dengan faktor bilangan kuadrat',
      facts: [
        { label: 'Panjang Petak', value: '√75 m', note: '75 = 25 × 3' },
        { label: 'Lebar Petak', value: '√12 m', note: '12 = 4 × 3' },
        { label: 'Faktor Akar', value: '√3', note: 'Akar sejenis' },
      ],
      sourceNote: 'Program Pekarangan Pangan Lestari Desa Kolam Kiri',
    },
    prompt:
      'Hasil penyederhanaan dari penjumlahan panjang dan lebar kebun (√75 + √12) adalah ....',
    options: ['7√3 meter', '√87 meter', '10√3 meter', '3√10 meter'],
    correctIndex: 0,
    feedbackCorrect:
      'Hebat! Kamu menyederhanakannya dengan tepat: √75 = √(25×3) = 5√3 dan √12 = √(4×3) = 2√3. Karena akarnya sejenis, 5√3 + 2√3 = 7√3 meter.',
    feedbackIncorrect:
      'Perhatikan aturan penjumlahan akar! Bilangan di dalam tanda akar TIDAK boleh langsung dijumlahkan (√75 + √12 ≠ √87). Pecah dulu menjadi faktor kuadrat: √75 = 5√3 dan √12 = 2√3, lalu jumlahkan koefisiennya: 5 + 2 = 7, sehingga hasilnya 7√3 meter.',
  },
  {
    id: 'Q10',
    number: 10,
    topic: 'akar',
    topicLabel: 'Bilangan Akar',
    type: 'PG',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Papan Nama Kayu Ulin Kantor Kecamatan Wanaraya',
    readingPassage:
      'Pengrajin kayu lokal di Kecamatan Wanaraya mendapat pesanan membuat papan nama ukiran dari kayu ulin tahan air untuk dipasang di halaman kantor kecamatan. Papan nama tersebut berbentuk persegi panjang dengan panjang √48 desimeter dan lebar √27 desimeter. Pemilik bengkel kayu ingin mengetahui luas permukaan papan yang harus dilapisi cat pelindung anti jamur agar kebutuhan cat dapat dibeli secukupnya tanpa berlebih. Siswa SMPN 1 Wanaraya membantu menghitung perkalian kedua bentuk akar tersebut secara teliti dengan memanfaatkan sifat perkalian bentuk akar yang hasilnya ternyata berupa bilangan bulat yang sangat rapi.',
    visual: {
      kind: 'infographic_cards',
      title: 'Ukuran Papan Nama Kayu Ulin Wanaraya',
      subtitle: 'Hitung luas permukaan: Luas = Panjang × Lebar',
      facts: [
        { label: 'Panjang', value: '√48 dm', note: '48 = 16 × 3' },
        { label: 'Lebar', value: '√27 dm', note: '27 = 9 × 3' },
        { label: 'Target', value: 'Luas (dm²)', note: '√48 × √27' },
      ],
      sourceNote: 'Bengkel Kerajinan Kayu Ulin Wanaraya',
    },
    prompt:
      'Luas permukaan papan nama kayu ulin yang harus dicat adalah ....',
    options: ['12 dm²', '24 dm²', '36 dm²', '75 dm²'],
    correctIndex: 2,
    feedbackCorrect:
      'Sempurna! √48 × √27 = (4√3) × (3√3) = 12 × 3 = 36 dm². Cepat dan akurat!',
    feedbackIncorrect:
      'Mari cek langkah perkaliannya: ubah √48 = 4√3 dan √27 = 3√3. Ketika dikalikan, kalikan bilangan bulat dengan bilangan bulat (4 × 3 = 12) dan akar dengan akar (√3 × √3 = 3). Maka luasnya adalah 12 × 3 = 36 dm².',
  },
  {
    id: 'Q11',
    number: 11,
    topic: 'akar',
    topicLabel: 'Bilangan Akar',
    type: 'MCMA',
    competency: 'Menalar',
    difficultyWeight: 3,
    stimulusTitle: 'Rasionalisasi Skala Peta Saluran Air Desa Babaktulung',
    readingPassage:
      'Tim pemetaan desa di Babaktulung, Wanaraya sedang menggambar peta teknis saluran air irigasi yang menghubungkan area persawahan warga. Dalam perhitungan rasio kemiringan saluran air, konsultan teknik menuliskan perbandingan tinggi terhadap panjang datar sebesar 12 / (√5 − √2) dalam satuan milimeter peta. Agar teknisi lapangan lebih mudah membaca nilai taksiran desimalnya tanpa kalkulator ilmiah, pecahan berpenyebut bentuk akar tersebut perlu dirasionalkan terlebih dahulu. Siswa kelas delapan diajak menalar penggunaan faktor sekawan pada penyebut agar bentuk pecahannya menjadi sederhana dan bebas dari tanda akar di bagian penyebut.',
    visual: {
      kind: 'infographic_cards',
      title: 'Rasio Teknis Kemiringan Saluran Air Babaktulung',
      subtitle: 'Merasionalkan penyebut dengan akar sekawan',
      facts: [
        { label: 'Rasio Awal', value: '12 / (√5 − √2)', note: 'Penyebut masih bentuk akar' },
        { label: 'Akar Sekawan', value: '(√5 + √2)', note: 'Tanda berlawanan' },
        { label: 'Identitas', value: '(a − b)(a + b) = a² − b²', note: '5 − 2 = 3' },
      ],
      sourceNote: 'Dokumen Teknis Irigasi Desa Babaktulung',
    },
    prompt:
      'Pilihlah semua pernyataan yang BENAR dalam proses merasionalkan rasio 12 / (√5 − √2)!',
    statements: [
      'Akar sekawan yang digunakan untuk mengalikan pembilang dan penyebut adalah (√5 + √2).',
      'Hasil perkalian penyebut (√5 − √2)(√5 + √2) sama dengan 3.',
      'Bentuk rasional paling sederhana dari pecahan tersebut adalah 4(√5 + √2).',
      'Nilai penyebut setelah dirasionalkan adalah √3.',
    ],
    correctIndices: [0, 1, 2],
    feedbackCorrect:
      'Luar biasa! Kamu memahami setiap langkah rasionalisasi: sekawannya (√5 + √2), penyebut menjadi 5 − 2 = 3, dan 12 ÷ 3 = 4 sehingga hasilnya 4(√5 + √2).',
    feedbackIncorrect:
      'Ingat identitas selisih kuadrat (√5 − √2)(√5 + √2) = (√5)² − (√2)² = 5 − 2 = 3 (bilangan bulat 3, BUKAN √3). Jadi tiga pernyataan pertama adalah benar.',
  },
  {
    id: 'Q12',
    number: 12,
    topic: 'akar',
    topicLabel: 'Bilangan Akar',
    type: 'MCMA',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Pengukuran Panjang Tali Tambat Perahu di Sungai Barito',
    readingPassage:
      'Nelayan dan petani yang tinggal di pinggiran anak Sungai Barito sekitar Wanaraya sering menggunakan perahu ces atau kelotok untuk mengangkut hasil kebun. Pak Amir menyiapkan empat gulungan tali nilon dengan panjang masing-masing bertuliskan kode hasil pengukuran √50 meter, √32 meter, √18 meter, dan √20 meter. Sebelum memilih tali yang paling efisien untuk disambung menjadi tali tambat dermaga kayu, Pak Amir bersama anaknya yang duduk di kelas 8 SMPN 1 Wanaraya menyederhanakan seluruh ukuran akar tersebut agar tahu tali mana saja yang memiliki bentuk akar sejenis dan dapat dijumlahkan langsung.',
    visual: {
      kind: 'bar_chart',
      title: 'Taksiran Panjang 4 Gulungan Tali Nilon (meter)',
      subtitle: 'Perbandingan panjang taksiran masing-masing gulungan tali',
      yAxisLabel: 'Panjang (m)',
      data: [
        { label: 'Tali A (√50)', value: 7.07, unit: 'm' },
        { label: 'Tali B (√32)', value: 5.66, unit: 'm' },
        { label: 'Tali C (√18)', value: 4.24, unit: 'm' },
        { label: 'Tali D (√20)', value: 4.47, unit: 'm' },
      ],
    },
    prompt:
      'Pilihlah pernyataan-pernyataan yang BENAR mengenai penyederhanaan panjang tali Pak Amir!',
    statements: [
      'Tali A (√50) bentuk sederhananya adalah 5√2 meter.',
      'Tali B (√32) dan Tali C (√18) memiliki akar sejenis yaitu √2.',
      'Jika Tali A dan Tali C disambung, panjang totalnya adalah 8√2 meter.',
      'Tali D (√20) bentuk sederhananya adalah 4√5 meter.',
    ],
    correctIndices: [0, 1, 2],
    feedbackCorrect:
      'Mantap! √50 = 5√2, √32 = 4√2, √18 = 3√2, sehingga Tali A + Tali C = 5√2 + 3√2 = 8√2 meter.',
    feedbackIncorrect:
      'Cek kembali penyederhanaan Tali D! √20 = √(4 × 5) = 2√5, BUKAN 4√5 (karena √4 = 2, bukan 4). Sementara pernyataan pertama, kedua, dan ketiga semuanya benar.',
  },
  {
    id: 'Q13',
    number: 13,
    topic: 'akar',
    topicLabel: 'Bilangan Akar',
    type: 'BS',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Uji Kekuatan Lampu Tenaga Surya Jalan Desa Wanaraya',
    readingPassage:
      'Pemerintah desa di Kecamatan Wanaraya memasang lampu penerangan jalan umum bertenaga surya di sepanjang jalan penghubung antar dusun. Pada buku panduan teknis panel surya, tertulis spesifikasi tegangan dan arus yang dinyatakan dalam operasi bentuk akar untuk latihan kalibrasi teknisi muda desa, yaitu hasil dari √125 − √45 + √20 dan perbandingan nilai √18 ÷ √2. Siswa kelas delapan yang sedang melakukan kunjungan edukasi balai desa ikut memeriksa perhitungan teknis tersebut menggunakan sifat operasi penjumlahan, pengurangan, serta pembagian bentuk akar agar tidak terjadi kesalahan pemasangan panel surya.',
    visual: {
      kind: 'infographic_cards',
      title: 'Lembar Uji Kalibrasi Panel Surya Desa Wanaraya',
      subtitle: 'Operasi hitung bentuk akar pada panduan teknis',
      facts: [
        { label: 'Operasi 1', value: '√125 − √45 + √20', note: 'Gunakan faktor √5' },
        { label: 'Operasi 2', value: '√18 ÷ √2', note: 'Pembagian akar' },
        { label: 'Operasi 3', value: '(2√3)²', note: 'Kuadrat bentuk akar' },
      ],
      sourceNote: 'Panduan Pemeliharaan PJU Tenaga Surya Wanaraya',
    },
    prompt:
      'Tentukan apakah setiap pernyataan perhitungan teknis panel surya berikut BENAR atau SALAH!',
    statements: [
      'Hasil dari √125 − √45 + √20 adalah 4√5.',
      'Hasil dari √18 ÷ √2 adalah 9.',
      'Nilai dari (2√3)² sama dengan 12.',
    ],
    correctBooleans: [true, false, true],
    feedbackCorrect:
      'Tepat sekali! √125 − √45 + √20 = 5√5 − 3√5 + 2√5 = 4√5 (Benar). √18 ÷ √2 = √(18÷2) = √9 = 3, bukan 9 (Salah). (2√3)² = 4 × 3 = 12 (Benar).',
    feedbackIncorrect:
      'Perhatikan operasi kedua: √18 ÷ √2 = √(18/2) = √9. Nilai dari √9 adalah 3, bukan 9! Tanda akarnya tetap berlaku saat membagi 18 dengan 2 sebelum ditarik akarnya.',
  },
  {
    id: 'Q14',
    number: 14,
    topic: 'akar',
    topicLabel: 'Bilangan Akar',
    type: 'BS',
    competency: 'Menalar',
    difficultyWeight: 3,
    stimulusTitle: 'Desain Kolam Terpal Berbingkai Bambu di SMPN 1 Wanaraya',
    readingPassage:
      'Kelompok belajar kelas 8B SMPN 1 Wanaraya merancang sebuah bingkai kolam terpal berbentuk persegi untuk budidaya lele. Guru pembina memberi tantangan: luas alas kolam tersebut ditetapkan tepat 72 meter persegi, namun bingkai bambu hanya dijual dalam potongan panjang kelipatan √2 meter. Siswa harus menentukan panjang sisi kolam dalam bentuk akar sederhana, lalu memperkirakan apakah kolam tersebut cukup diletakkan di sudut lahan kosong sekolah yang panjang sisinya 9 meter. Dengan menalar nilai taksiran bilangan akar antara dua bilangan kuadrat terdekat, siswa dapat mengambil keputusan yang tepat sebelum memotong bambu.',
    visual: {
      kind: 'infographic_cards',
      title: 'Tantangan Desain Kolam Lele Kelas 8B',
      subtitle: 'Menentukan ukuran sisi √72 meter terhadap lahan 9 meter',
      facts: [
        { label: 'Luas Kolam', value: '72 m²', note: 'Bentuk persegi' },
        { label: 'Panjang Sisi', value: '√72 m', note: '72 = 36 × 2' },
        { label: 'Batas Lahan', value: '9 m × 9 m', note: 'Luas lahan = 81 m²' },
      ],
      sourceNote: 'Proyek P5 Budidaya Ikan SMPN 1 Wanaraya',
    },
    prompt:
      'Tentukan BENAR atau SALAH setiap pernyataan penalaran tentang desain kolam lele tersebut!',
    statements: [
      'Panjang sisi kolam jika disederhanakan adalah 6√2 meter.',
      'Keliling seluruh bingkai kolam persegi tersebut adalah 24√2 meter.',
      'Kolam tersebut tidak muat diletakkan di lahan 9 m × 9 m karena √72 lebih besar dari 9.',
    ],
    correctBooleans: [true, true, false],
    feedbackCorrect:
      'Brilian! √72 = 6√2 m (Benar), keliling = 4 × 6√2 = 24√2 m (Benar). Karena 9 = √81 dan √72 < √81, maka kolam MUAT di lahan 9 m × 9 m, sehingga pernyataan ketiga Salah.',
    feedbackIncorrect:
      'Cermati perbandingan bilangan akar pada pernyataan ketiga: ubah 9 menjadi bentuk akar yaitu √81. Karena 72 lebih kecil dari 81, maka √72 < √81 (sekitar 8,49 m < 9 m). Artinya kolam masih muat di lahan tersebut!',
  },

  // ==================== 3. PENULISAN BENTUK BAKU (Q15 - Q18) ====================
  {
    id: 'Q15',
    number: 15,
    topic: 'baku',
    topicLabel: 'Penulisan Bentuk Baku',
    type: 'PG',
    competency: 'Memahami',
    difficultyWeight: 1,
    isListeningFocus: true,
    stimulusTitle: 'Produksi Padi Kecamatan Wanaraya dalam Catatan Statistik',
    readingPassage:
      'Kecamatan Wanaraya di Kabupaten Barito Kuala dikenal sebagai salah satu sentra produksi padi lahan pasang surut yang penting. Berdasarkan laporan dinas pertanian tahunan, dalam satu musim panen raya gabungan seluruh desa di Wanaraya mampu menghasilkan sekitar 24.500.000 kilogram gabah kering panen. Angka jutaan kilogram seperti itu cukup panjang apabila harus ditulis berulang kali dalam tabel ringkasan statistik kabupaten. Oleh karena itu, siswa kelas delapan SMPN 1 Wanaraya berlatih mengubah bilangan besar tersebut ke dalam penulisan bentuk baku atau notasi ilmiah agar penulisan laporan data pangan menjadi lebih ringkas dan standar.',
    visual: {
      kind: 'bar_chart',
      title: 'Estimasi Gabah Kering Panen Wilayah Wanaraya (Juta kg)',
      subtitle: 'Kontribusi gabungan desa-desa sentra padi di Wanaraya',
      yAxisLabel: 'Juta kg',
      data: [
        { label: 'Kolam Kanan', value: 6.5, unit: 'jt kg' },
        { label: 'Kolam Kiri', value: 5.8, unit: 'jt kg' },
        { label: 'Sidomulyo', value: 6.2, unit: 'jt kg' },
        { label: 'Desa Lainnya', value: 6.0, unit: 'jt kg' },
      ],
    },
    prompt:
      'Penulisan bentuk baku (notasi ilmiah) yang tepat untuk total produksi gabah 24.500.000 kg adalah ....',
    options: ['24,5 × 10⁶', '2,45 × 10⁷', '2,45 × 10⁶', '0,245 × 10⁸'],
    correctIndex: 1,
    feedbackCorrect:
      'Tepat sekali! Syarat bentuk baku adalah a × 10ⁿ dengan 1 ≤ a < 10. Menggeser koma dari belakang angka terakhir ke antara 2 dan 4 sebanyak 7 langkah ke kiri menghasilkan 2,45 × 10⁷.',
    feedbackIncorrect:
      'Ingat syarat utama bentuk baku: bilangan di depan (a) harus bernilai antara 1 sampai kurang dari 10 (1 ≤ a < 10), sehingga 24,5 atau 0,245 belum memenuhi syarat baku. Dari 24.500.000, geser koma 7 langkah ke kiri menjadi 2,45 × 10⁷.',
  },
  {
    id: 'Q16',
    number: 16,
    topic: 'baku',
    topicLabel: 'Penulisan Bentuk Baku',
    type: 'PG',
    competency: 'Memahami',
    difficultyWeight: 1,
    stimulusTitle: 'Pengamatan Ukuran Spora Jamur Padi di Lab IPA SMPN 1 Wanaraya',
    readingPassage:
      'Saat praktikum IPA terpadu di SMPN 1 Wanaraya, siswa kelas delapan menggunakan mikroskop cahaya untuk mengamati ukuran partikel debu sekam dan spora jamur daun padi dari sawah sekitar sekolah. Buku panduan laboratorium menyebutkan bahwa diameter rata-rata satu sel spora yang teramati adalah 0,000048 meter. Menuliskan banyak angka nol di belakang koma sangat rawan menyebabkan kesalahan baca atau salah ketik dalam laporan praktikum. Oleh sebab itu, guru IPA dan guru Matematika berkolaborasi mengajarkan cara menuliskan bilangan sangat kecil tersebut menjadi notasi ilmiah berpangkat negatif yang lebih mudah dibaca.',
    visual: {
      kind: 'infographic_cards',
      title: 'Infografis Pengukuran Mikroskop Lab SMPN 1 Wanaraya',
      subtitle: 'Konversi bilangan desimal sangat kecil ke notasi ilmiah',
      facts: [
        { label: 'Diameter Spora', value: '0,000048 m', note: 'Bilangan < 1' },
        { label: 'Syarat Koefisien', value: '1 ≤ a < 10', note: 'Menjadi 4,8' },
        { label: 'Arah Geser Koma', value: 'Ke kanan', note: 'Pangkat bernilai negatif' },
      ],
      sourceNote: 'Modul Praktikum Lab IPA SMPN 1 Wanaraya',
    },
    prompt:
      'Penulisan bentuk baku dari diameter spora 0,000048 meter adalah ....',
    options: ['4,8 × 10⁻⁴', '4,8 × 10⁻⁵', '48 × 10⁻⁶', '4,8 × 10⁵'],
    correctIndex: 1,
    feedbackCorrect:
      'Hebat! Untuk mencapai 4,8 dari 0,000048, tanda koma bergeser ke kanan sebanyak 5 langkah, sehingga pangkat sepuluhnya bernilai −5: 4,8 × 10⁻⁵.',
    feedbackIncorrect:
      'Ayo hitung langkah pergeseran komanya dengan teliti! Dari 0,000048 menuju 4,8 koma digeser ke kanan melewati empat angka nol dan satu angka 4, total 5 langkah. Karena bilangannya kurang dari 1, pangkatnya negatif: 4,8 × 10⁻⁵.',
  },
  {
    id: 'Q17',
    number: 17,
    topic: 'baku',
    topicLabel: 'Penulisan Bentuk Baku',
    type: 'PG',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Anggaran Perbaikan Jembatan Kayu Ulin Penghubung Desa',
    readingPassage:
      'Pemerintah Kecamatan Wanaraya bersama masyarakat merencanakan pemeliharaan berkala tiga jembatan kayu ulin yang menjadi jalur utama siswa menuju SMPN 1 Wanaraya. Dalam dokumen rencana anggaran biaya, tercatat kebutuhan dana sebesar 1,25 × 10⁸ rupiah untuk pengadaan papan ulin dan baut baja anti karat di Jembatan A, serta 7,5 × 10⁷ rupiah untuk perbaikan pagar pengaman Jembatan B. Bendahara desa ingin menjumlahkan kedua pos anggaran tersebut dan menuliskan totalnya tetap dalam format bentuk baku yang sesuai aturan matematika agar mudah dicatat pada papan transparansi dana desa di balai desa.',
    imagePath: '/src/assets/images/wanaraya_bridge_scene_1794867846879.jpg',
    visual: {
      kind: 'infographic_cards',
      title: 'Rencana Anggaran Pemeliharaan Jembatan Ulin Wanaraya',
      subtitle: 'Penjumlahan dua bilangan dalam notasi ilmiah',
      facts: [
        { label: 'Jembatan A', value: 'Rp 1,25 × 10⁸', note: 'Rp 125.000.000' },
        { label: 'Jembatan B', value: 'Rp 7,5 × 10⁷', note: 'Rp 75.000.000' },
        { label: 'Total Anggaran', value: 'A + B', note: 'Nyatakan dalam bentuk baku' },
      ],
      sourceNote: 'Papan Informasi Pembangunan Kecamatan Wanaraya',
    },
    prompt:
      'Total anggaran pemeliharaan Jembatan A dan Jembatan B jika ditulis dalam bentuk baku adalah ....',
    options: ['2,0 × 10⁸ rupiah', '8,75 × 10⁸ rupiah', '2,0 × 10¹⁵ rupiah', '20 × 10⁷ rupiah'],
    correctIndex: 0,
    feedbackCorrect:
      'Tepat sekali! Samakan pangkatnya atau ubah ke bilangan biasa: 125.000.000 + 75.000.000 = 200.000.000 = 2,0 × 10⁸ rupiah.',
    feedbackIncorrect:
      'Hati-hati! Kamu tidak bisa langsung menjumlahkan 1,25 + 7,5 karena pangkat sepuluhnya berbeda (10⁸ dan 10⁷). Ubah 7,5 × 10⁷ menjadi 0,75 × 10⁸ terlebih dahulu, lalu jumlahkan (1,25 + 0,75) × 10⁸ = 2,0 × 10⁸.',
  },
  {
    id: 'Q18',
    number: 18,
    topic: 'baku',
    topicLabel: 'Penulisan Bentuk Baku',
    type: 'PG',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Kapasitas Penyimpanan Server Perpustakaan Digital Sekolah',
    readingPassage:
      'Perpustakaan SMPN 1 Wanaraya baru saja melengkapi komputer server lokal berisi ribuan buku pelajaran elektronik dan video pembelajaran Matematika untuk siswa kelas 8A dan 8B. Kapasitas ruang penyimpanan aktif yang tersedia pada cakram keras server tersebut adalah 3,2 × 10¹¹ byte. Apabila setiap modul video pembelajaran interaktif berukuran rata-rata 8 × 10⁷ byte, pengelola perpustakaan ingin menghitung berapa banyak modul video yang dapat disimpan secara maksimal ke dalam server tersebut. Siswa diajak mengaplikasikan sifat pembagian pada bilangan bentuk baku untuk memecahkan masalah teknologi sekolah ini.',
    visual: {
      kind: 'infographic_cards',
      title: 'Spesifikasi Server Perpustakaan SMPN 1 Wanaraya',
      subtitle: 'Menghitung kapasitas jumlah file video dengan pembagian bentuk baku',
      facts: [
        { label: 'Kapasitas Server', value: '3,2 × 10¹¹ byte', note: '32 × 10¹⁰ byte' },
        { label: 'Ukuran 1 Video', value: '8 × 10⁷ byte', note: '80 MB' },
        { label: 'Operasi', value: 'Server ÷ 1 Video', note: 'Hasil dalam bentuk baku' },
      ],
      sourceNote: 'Laboratorium Komputer SMPN 1 Wanaraya',
    },
    prompt:
      'Banyaknya modul video yang dapat ditampung server perpustakaan dalam penulisan bentuk baku adalah ....',
    options: ['4 × 10³ modul', '4 × 10⁴ modul', '2,5 × 10³ modul', '4 × 10¹⁸ modul'],
    correctIndex: 0,
    feedbackCorrect:
      'Cerdas! (3,2 × 10¹¹) ÷ (8 × 10⁷) = (32 × 10¹⁰) ÷ (8 × 10⁷) = 4 × 10¹⁰⁻⁷ = 4 × 10³ = 4.000 modul video.',
    feedbackIncorrect:
      'Perhatikan pembagian 3,2 ÷ 8 = 0,4! Agar sesuai syarat bentuk baku (1 ≤ a < 10), ubah 0,4 × 10⁴ menjadi 4 × 10³ modul (4.000 modul).',
  },
];
