import { Question } from '../types/quiz';

export const QUESTIONS_PART_2: Question[] = [
  // ==================== 3. PENULISAN BENTUK BAKU LANJUTAN (Q19 - Q21) ====================
  {
    id: 'Q19',
    number: 19,
    topic: 'baku',
    topicLabel: 'Penulisan Bentuk Baku',
    type: 'MCMA',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Infografis Jarak & Data Alam Sekitar Kalimantan Selatan',
    readingPassage:
      'Pada pelajaran proyek lintas mata pelajaran IPA dan Matematika, siswa kelas 8 SMPN 1 Wanaraya membuat poster infografis berisi data jarak dan ukuran benda alam di sekitar Kalimantan hingga antariksa. Beberapa data tercatat dalam bentuk bilangan biasa maupun notasi ilmiah, seperti luas lahan pertanian rawa Wanaraya sekitar 125.000.000 meter persegi, jarak tempuh sungai menuju muara 45.000 meter, massa partikel kabut tipis 0,0000032 gram, serta jarak rata-rata Bumi ke Matahari sekitar 1,5 × 10¹¹ meter. Siswa diminta memeriksa konversi penulisan bentuk baku yang benar untuk dicetak pada mading sekolah.',
    visual: {
      kind: 'infographic_cards',
      title: 'Mading Data Ilmiah Siswa SMPN 1 Wanaraya',
      subtitle: 'Periksa ketepatan konversi ke notasi ilmiah (a × 10ⁿ, 1 ≤ a < 10)',
      facts: [
        { label: 'Lahan Pertanian', value: '125.000.000 m²', note: 'Ubah ke bentuk baku' },
        { label: 'Jarak Jalur Sungai', value: '45.000 m', note: 'Ubah ke bentuk baku' },
        { label: 'Partikel Kabut', value: '0,0000032 g', note: 'Pangkat negatif' },
      ],
      sourceNote: 'Mading Sains Kelas VIII SMPN 1 Wanaraya',
    },
    prompt:
      'Pilihlah semua konversi bentuk baku yang BENAR dari data mading siswa di atas!',
    statements: [
      'Luas 125.000.000 m² ditulis dalam bentuk baku menjadi 1,25 × 10⁸ m².',
      'Jarak 45.000 m ditulis dalam bentuk baku menjadi 4,5 × 10⁴ m.',
      'Massa 0,0000032 gram ditulis dalam bentuk baku menjadi 3,2 × 10⁻⁶ gram.',
      'Bilangan 1,5 × 10¹¹ meter sama nilainya dengan 15.000.000.000 meter.',
    ],
    correctIndices: [0, 1, 2],
    feedbackCorrect:
      'Teliti sekali! 125.000.000 = 1,25 × 10⁸, 45.000 = 4,5 × 10⁴, dan 0,0000032 = 3,2 × 10⁻⁶ semuanya benar.',
    feedbackIncorrect:
      'Cek pernyataan keempat! 1,5 × 10¹¹ berarti 15 diikuti sepuluh angka nol = 150.000.000.000 meter (150 miliar), bukan 15 miliar! Tiga pernyataan pertama sudah benar.',
  },
  {
    id: 'Q20',
    number: 20,
    topic: 'baku',
    topicLabel: 'Penulisan Bentuk Baku',
    type: 'BS',
    competency: 'Menalar',
    difficultyWeight: 3,
    stimulusTitle: 'Analisis Kandungan Pupuk Cair Organik Kebun Jeruk',
    readingPassage:
      'Kelompok tani muda di Desa Kolam Kanan memproduksi pupuk cair organik yang kaya mikroba baik penyubur tanah rawa. Hasil uji laboratorium menunjukkan dalam 1 mililiter pupuk cair terkandung 2,5 × 10⁶ sel bakteri pengurai. Untuk menyuburkan satu petak kebun jeruk Siam, petani mencampurkan 4 × 10² mililiter pupuk cair ke dalam tangki semprot besar berisi air bersih. Siswa kelas delapan diajak menalar perkalian dan penulisan bentuk baku guna menghitung total bakteri yang disebarkan ke satu petak kebun jeruk serta membandingkan kebenaran tiga pernyataan kesimpulan kelompok pengamat.',
    visual: {
      kind: 'infographic_cards',
      title: 'Data Uji Pupuk Organik Kebun Jeruk Kolam Kanan',
      subtitle: 'Hitung total bakteri = (bakteri/mL) × (volume mL)',
      facts: [
        { label: 'Kepadatan Bakteri', value: '2,5 × 10⁶ sel/mL', note: 'Hasil uji lab' },
        { label: 'Dosis per Petak', value: '4 × 10² mL', note: '400 mL pupuk cair' },
        { label: 'Total Bakteri', value: '10 × 10⁸ sel', note: 'Sederhanakan ke 1 × 10ⁿ' },
      ],
      sourceNote: 'Kelompok Tani Muda Wanaraya',
    },
    prompt:
      'Tentukan BENAR atau SALAH setiap kesimpulan mengenai total bakteri pada pupuk cair tersebut!',
    statements: [
      'Total bakteri dalam 4 × 10² mL pupuk cair adalah 1 × 10⁹ sel.',
      'Penulisan 10 × 10⁸ sudah merupakan bentuk baku yang paling tepat menurut aturan matematika.',
      'Jika dosis pupuk dinaikkan 2 kali lipat, jumlah bakterinya menjadi 2 × 10⁹ sel.',
    ],
    correctBooleans: [true, false, true],
    feedbackCorrect:
      'Sangat tepat! (2,5 × 4) × 10⁶⁺² = 10 × 10⁸ = 1 × 10⁹ sel (Benar). Bentuk 10 × 10⁸ BELUM baku karena koefisien a = 10 tidak memenuhi syarat a < 10 (Salah). Jika dikali 2 menjadi 2 × 10⁹ (Benar).',
    feedbackIncorrect:
      'Ingat kembali batas syarat koefisien a pada bentuk baku (a × 10ⁿ): nilai a harus kurang dari 10 (1 ≤ a < 10). Jadi angka 10 pada 10 × 10⁸ tidak diperbolehkan dan harus diubah menjadi 1 × 10⁹!',
  },
  {
    id: 'Q21',
    number: 21,
    topic: 'baku',
    topicLabel: 'Penulisan Bentuk Baku',
    type: 'BS',
    competency: 'Menalar',
    difficultyWeight: 3,
    stimulusTitle: 'Perbandingan Emisi Debu & Kualitas Udara di Musim Kemarau',
    readingPassage:
      'Pada musim kemarau, tim UKS dan Pecinta Alam SMPN 1 Wanaraya memantau indeks partikel halus PM2,5 yang melayang di udara menggunakan alat ukur portabel sekolah. Pagi hari yang sejuk mencatat konsentrasi partikel sebesar 1,2 × 10⁻⁵ gram per meter kubik udara, sedangkan siang hari saat lalu lintas truk pengangkut hasil kebun meningkat tercatat 4,8 × 10⁻⁵ gram per meter kubik. Siswa diajak menalar rasio peningkatan partikel halus antara pagi dan siang hari menggunakan aturan perbandingan bentuk baku berpangkat negatif agar dapat menyusun imbauan penggunaan masker secara tepat.',
    visual: {
      kind: 'line_chart',
      title: 'Konsentrasi Partikel Udara Sekitar Jalan Wanaraya (×10⁻⁵ g/m³)',
      subtitle: 'Perbandingan data pengukuran pagi dan siang hari',
      yAxisLabel: '×10⁻⁵ g/m³',
      data: [
        { label: '06.00 Pagi', value: 1.2, unit: '×10⁻⁵' },
        { label: '09.00 Pagi', value: 2.4, unit: '×10⁻⁵' },
        { label: '12.00 Siang', value: 4.8, unit: '×10⁻⁵', highlight: true },
        { label: '16.00 Sore', value: 3.0, unit: '×10⁻⁵' },
      ],
    },
    prompt:
      'Tentukan BENAR atau SALAH setiap pernyataan perbandingan kualitas udara berikut!',
    statements: [
      'Konsentrasi partikel pada pukul 12.00 Siang adalah 4 kali lipat dibanding pukul 06.00 Pagi.',
      'Selisih konsentrasi partikel antara pukul 12.00 dan 06.00 adalah 3,6 × 10⁻⁵ g/m³.',
      'Nilai 1,2 × 10⁻⁵ lebih kecil daripada 9,5 × 10⁻⁶.',
    ],
    correctBooleans: [true, true, false],
    feedbackCorrect:
      'Hebat! 4,8 ÷ 1,2 = 4 kali lipat (Benar); 4,8 − 1,2 = 3,6 × 10⁻⁵ (Benar); dan 1,2 × 10⁻⁵ = 12 × 10⁻⁶ yang JELAS lebih besar dari 9,5 × 10⁻⁶ (Salah).',
    feedbackIncorrect:
      'Perhatikan pangkat negatif pada pernyataan ketiga! Bilangan 1,2 × 10⁻⁵ = 0,000012 sedangkan 9,5 × 10⁻⁶ = 0,0000095. Karena pangkat −5 lebih besar nilainya dari −6, maka 1,2 × 10⁻⁵ lebih BESAR dari 9,5 × 10⁻⁶.',
  },

  // ==================== 4. TEOREMA PYTHAGORAS (Q22 - Q28) ====================
  {
    id: 'Q22',
    number: 22,
    topic: 'pythagoras',
    topicLabel: 'Teorema Pythagoras',
    type: 'PG',
    competency: 'Memahami',
    difficultyWeight: 1,
    isListeningFocus: true,
    stimulusTitle: 'Rute Terdekat Siswa dari Simpang Desa ke SMPN 1 Wanaraya',
    readingPassage:
      'Setiap pagi, Rina berangkat bersepeda dari rumahnya di Desa Kolam Kanan menuju SMPN 1 Wanaraya melewati jalan utama yang berbelok siku-siku di pos kamling simpang desa. Dari rumah Rina ke arah timur menuju pos kamling berjarak 600 meter, lalu berbelok tepat 90 derajat ke arah utara menuju gerbang sekolah sejauh 800 meter. Pemerintah desa berencana membangun jalan pintas lurus beraspal yang memotong langsung dari dekat rumah Rina ke arah gerbang sekolah untuk mempercepat akses pelajar dan warga. Rina penasaran berapa meter panjang lintasan jalan pintas lurus tersebut jika dihitung menggunakan Teorema Pythagoras.',
    visual: {
      kind: 'pythagoras_diagram',
      title: 'Peta Segitiga Siku-Siku Rute Rina ke SMPN 1 Wanaraya',
      subtitle: 'Pos Kamling membentuk sudut siku-siku 90°',
      sideALabel: '600 m (Timur)',
      sideBLabel: '800 m (Utara)',
      hypotenuseLabel: 'c = ? m (Jalan Pintas)',
      pointA: 'Rumah Rina',
      pointB: 'Pos Kamling (90°)',
      pointC: 'SMPN 1 Wanaraya',
      contextCaption: 'Gunakan rumus c² = a² + b²',
    },
    prompt:
      'Panjang jalan pintas lurus dari rumah Rina langsung ke SMPN 1 Wanaraya adalah ....',
    options: ['900 meter', '1.000 meter', '1.200 meter', '1.400 meter'],
    correctIndex: 1,
    feedbackCorrect:
      'Mantap! Kamu menguasai Tripel Pythagoras (6, 8, 10): c = √(600² + 800²) = √(360.000 + 640.000) = √1.000.000 = 1.000 meter.',
    feedbackIncorrect:
      'Ingat Teorema Pythagoras, sisi miring tidak dihitung dengan menjumlahkan langsung 600 + 800 = 1.400 m. Kuadratkan dulu masing-masing sisi siku-sikunya: c = √(600² + 800²) = √(360.000 + 640.000) = √1.000.000 = 1.000 meter.',
  },
  {
    id: 'Q23',
    number: 23,
    topic: 'pythagoras',
    topicLabel: 'Teorema Pythagoras',
    type: 'PG',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Tinggi Tiang Bendera Upacara Halaman SMPN 1 Wanaraya',
    readingPassage:
      'Menjelang upacara Hari Pendidikan Nasional di SMPN 1 Wanaraya, petugas paskibra sekolah melakukan pengecekan tali pengerek dan tinggi tiang bendera utama di tengah lapangan. Untuk mengukur tinggi tiang tanpa harus memanjatnya, pembina pramuka mengikatkan seutas tali pengukur sepanjang 13 meter tepat dari puncak tiang bendera lalu ditarik kencang ke patok tanah yang berjarak 5 meter secara mendatar dari kaki tiang bendera. Karena tiang bendera berdiri tegak lurus terhadap permukaan lapangan yang datar, susunan tiang, jarak tanah, dan tali pengukur tersebut membentuk bangun segitiga siku-siku yang sempurna.',
    visual: {
      kind: 'pythagoras_diagram',
      title: 'Sketsa Pengukuran Tinggi Tiang Bendera Sekolah',
      subtitle: 'Sisi miring (tali) = 13 m, alas datar = 5 m',
      sideALabel: '5 m (Jarak Tanah)',
      sideBLabel: 't = ? m (Tinggi Tiang)',
      hypotenuseLabel: '13 m (Tali Miring)',
      pointA: 'Patok Tanah',
      pointB: 'Kaki Tiang (90°)',
      pointC: 'Puncak Tiang',
      contextCaption: 'Mencari sisi tegak: t² = c² − a²',
    },
    prompt:
      'Tinggi tiang bendera SMPN 1 Wanaraya tersebut adalah ....',
    options: ['8 meter', '10 meter', '12 meter', '18 meter'],
    correctIndex: 2,
    feedbackCorrect:
      'Tepat sekali! Dengan Tripel Pythagoras (5, 12, 13): t = √(13² − 5²) = √(169 − 25) = √144 = 12 meter.',
    feedbackIncorrect:
      'Perhatikan letak sisi miringnya! Panjang 13 meter adalah tali miring (hipotenusa), bukan sisi tegak. Untuk mencari tinggi tiang (sisi tegak), kita harus MENGURANGI kuadrat hipotenusa: t = √(13² − 5²) = √(169 − 25) = √144 = 12 meter.',
  },
  {
    id: 'Q24',
    number: 24,
    topic: 'pythagoras',
    topicLabel: 'Teorema Pythagoras',
    type: 'PG',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Kawat Penopang Jembatan Kayu Ulin Sungai Wanaraya',
    readingPassage:
      'Sebuah jembatan kayu ulin penyeberangan sungai kecil di Wanaraya memiliki tiang penyangga utama setinggi 8 meter dari permukaan geladak jembatan. Untuk memperkuat kestabilan jembatan saat dilewati gerobak hasil panen, tukang memasang kawat baja penopang dari puncak tiang menuju ujung geladak yang berjarak 15 meter dari pangkal tiang. Tukang juga berencana mengecek apakah sebatang kayu penopang tambahan sepanjang 20 meter cukup untuk menggantikan kawat baja tersebut. Dengan menggunakan perhitungan Teorema Pythagoras, siswa kelas delapan dapat menghitung panjang kawat baja minimum yang dibutuhkan untuk satu sisi tiang jembatan.',
    imagePath: '/src/assets/images/wanaraya_bridge_scene_1794867846879.jpg',
    visual: {
      kind: 'pythagoras_diagram',
      title: 'Konstruksi Kawat Baja Jembatan Ulin Wanaraya',
      subtitle: 'Tinggi tiang 8 m dan bentang geladak 15 m',
      sideALabel: '15 m (Bentang Geladak)',
      sideBLabel: '8 m (Tinggi Tiang)',
      hypotenuseLabel: 'c = ? m (Kawat Baja)',
      pointA: 'Ujung Geladak',
      pointB: 'Pangkal Tiang (90°)',
      pointC: 'Puncak Tiang',
      contextCaption: 'Tripel Pythagoras: 8, 15, ...',
    },
    prompt:
      'Panjang minimal satu kawat baja penopang jembatan tersebut adalah ....',
    options: ['17 meter', '19 meter', '21 meter', '23 meter'],
    correctIndex: 0,
    feedbackCorrect:
      'Hebat! Pasangan Tripel Pythagoras (8, 15, 17): c = √(8² + 15²) = √(64 + 225) = √289 = 17 meter.',
    feedbackIncorrect:
      'Jangan lupa mengkuadratkan kedua sisinya terlebih dahulu: 8² + 15² = 64 + 225 = 289. Akar kuadrat dari 289 adalah 17 meter (bukan 8 + 15 = 23 meter).',
  },
  {
    id: 'Q25',
    number: 25,
    topic: 'pythagoras',
    topicLabel: 'Teorema Pythagoras',
    type: 'PG',
    competency: 'Menalar',
    difficultyWeight: 3,
    stimulusTitle: 'Lintasan Perahu Nelayan Menyeberangi Saluran Sungai',
    readingPassage:
      'Pak Joni mendayung perahu kelotok menyeberangi saluran sungai utama di Wanaraya yang memiliki lebar tegak lurus 24 meter. Karena arus air sungai cukup deras mengalir ke arah hilir, perahu Pak Joni terdorong arus sehingga mendarat di seberang sejauh 7 meter di hilir dari titik seberang lurus tujuan awalnya. Apabila lintasan gerak perahu Pak Joni di atas permukaan air dianggap berupa garis lurus miring, siswa diajak menalar jarak lintasan sebenarnya yang ditempuh perahu tersebut. Selanjutnya siswa membandingkan selisih jarak tempuh aktual dengan lebar sungai apabila arus air sedang tenang.',
    visual: {
      kind: 'pythagoras_diagram',
      title: 'Lintasan Perahu Menyeberangi Sungai Wanaraya',
      subtitle: 'Lebar sungai 24 m dan pergeseran arus hilir 7 m',
      sideALabel: '7 m (Geser Hilir)',
      sideBLabel: '24 m (Lebar Sungai)',
      hypotenuseLabel: 'Jarak Tempuh Perahu = ?',
      pointA: 'Titik Mendarat',
      pointB: 'Titik Seberang Lurus (90°)',
      pointC: 'Dermaga Awal',
      contextCaption: 'Selisih jarak = Lintasan miring − 24 m',
    },
    prompt:
      'Berapa meterkah jarak tempuh perahu sebenarnya DAN berapa meter lebih jauh dibanding lebar tegak lurus sungai?',
    options: [
      '25 meter dan lebih jauh 1 meter',
      '25 meter dan lebih jauh 7 meter',
      '26 meter dan lebih jauh 2 meter',
      '31 meter dan lebih jauh 7 meter',
    ],
    correctIndex: 0,
    feedbackCorrect:
      'Keren! Jarak tempuh perahu = √(24² + 7²) = √(576 + 49) = √625 = 25 meter. Maka selisihnya dengan lebar sungai adalah 25 − 24 = 1 meter saja!',
    feedbackIncorrect:
      'Perhatikan kata tanya ganda pada soal: pertama cari jarak miring √(24² + 7²) = √625 = 25 m. Kedua, cari "lebih jauh dibanding lebar tegak lurus sungai", yaitu 25 m − 24 m = 1 meter (bukan 7 m).',
  },
  {
    id: 'Q26',
    number: 26,
    topic: 'pythagoras',
    topicLabel: 'Teorema Pythagoras',
    type: 'MCMA',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Uji Kerangka Kayu Siku-Siku Proyek Prakarya Kelas 8A',
    readingPassage:
      'Pada pelajaran Prakarya di kelas 8A SMPN 1 Wanaraya, setiap kelompok diminta merakit bingkai rak buku segitiga siku-siku dari potongan kayu galam sisa bangunan. Untuk memastikan sudut rak benar-benar siku-siku 90 derajat tanpa busur derajat besar, guru memberikan empat pilihan set ukuran panjang potongan kayu (dalam sentimeter) kepada masing-masing kelompok. Siswa harus menguji pasangan tiga bilangan tersebut menggunakan kebalikan Teorema Pythagoras (a² + b² = c² dengan c sebagai sisi terpanjang). Hanya kelompok yang memilih ukuran Tripel Pythagoras yang rak kayunya akan berdiri tegak siku-siku sempurna.',
    visual: {
      kind: 'infographic_cards',
      title: 'Daftar Paket Ukuran Kayu Kelompok Prakarya 8A',
      subtitle: 'Syarat Segitiga Siku-Siku: a² + b² = c² (c = sisi terpanjang)',
      facts: [
        { label: 'Paket 1', value: '9, 12, 15 cm', note: 'Uji 9² + 12² vs 15²' },
        { label: 'Paket 2', value: '7, 24, 25 cm', note: 'Uji 7² + 24² vs 25²' },
        { label: 'Paket 3 & 4', value: '8, 10, 12 & 10, 24, 26', note: 'Pilih yang siku-siku' },
      ],
      sourceNote: 'Praktikum Prakarya & Matematika Kelas 8A',
    },
    prompt:
      'Pilihlah semua paket ukuran kayu yang PASTI membentuk segitiga siku-siku (Tripel Pythagoras)!',
    statements: [
      'Paket 1 berukuran 9 cm, 12 cm, dan 15 cm.',
      'Paket 2 berukuran 7 cm, 24 cm, dan 25 cm.',
      'Paket 3 berukuran 8 cm, 10 cm, dan 12 cm.',
      'Paket 4 berukuran 10 cm, 24 cm, dan 26 cm.',
    ],
    correctIndices: [0, 1, 3],
    feedbackCorrect:
      'Luar biasa! 9² + 12² = 225 = 15², 7² + 24² = 625 = 25², dan 10² + 24² = 676 = 26². Semuanya adalah Tripel Pythagoras!',
    feedbackIncorrect:
      'Coba uji Paket 3: 8² + 10² = 64 + 100 = 164, sedangkan 12² = 144. Karena 164 ≠ 144 (a² + b² > c²), Paket 3 justru membentuk segitiga lancip, bukan siku-siku. Paket 1, 2, dan 4 benar.',
  },
  {
    id: 'Q27',
    number: 27,
    topic: 'pythagoras',
    topicLabel: 'Teorema Pythagoras',
    type: 'BS',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Pemasangan Tangga Perawatan Atap Aula SMPN 1 Wanaraya',
    readingPassage:
      'Petugas kebersihan sekolah menyandarkan sebuah tangga aluminium sepanjang 5 meter pada dinding aula SMPN 1 Wanaraya untuk membersihkan talang air hujan. Jarak ujung bawah tangga ke dasar dinding aula adalah 3 meter pada lantai keramik datar. Guru matematika yang kebetulan melintas mengajak siswa kelas delapan yang sedang beristirahat untuk mengamati perubahan tinggi jangkauan tangga jika ujung bawahnya digeser menjauh atau mendekat. Siswa diminta memeriksa kebenaran tiga pernyataan tentang ketinggian dinding yang dicapai tangga dalam posisi awal maupun setelah ujung bawah tangga digeser sejauh 1 meter lebih jauh.',
    visual: {
      kind: 'pythagoras_diagram',
      title: 'Tangga Aluminium Bersandar pada Dinding Aula',
      subtitle: 'Panjang tangga tetap 5 meter',
      sideALabel: '3 m (Posisi Awal)',
      sideBLabel: 't = ? m (Tinggi Dinding)',
      hypotenuseLabel: '5 m (Panjang Tangga)',
      pointA: 'Kaki Tangga',
      pointB: 'Dasar Dinding (90°)',
      pointC: 'Ujung Atas Tangga',
      contextCaption: 'Cek posisi awal (alas 3 m) & setelah digeser (alas 4 m)',
    },
    prompt:
      'Tentukan BENAR atau SALAH setiap pernyataan mengenai posisi tangga pada dinding aula tersebut!',
    statements: [
      'Pada posisi awal (alas 3 m), ujung atas tangga mencapai ketinggian 4 meter.',
      'Jika kaki tangga digeser 1 meter lebih jauh dari dinding (menjadi 4 m), tinggi jangkauan turun menjadi 3 meter.',
      'Pada kedua posisi tersebut, panjang tangga (5 m) selalu lebih pendek daripada penjumlahan alas dan tingginya.',
    ],
    correctBooleans: [true, true, true],
    feedbackCorrect:
      'Sempurna! Pada alas 3 m, tinggi = √(5²−3²) = 4 m (Benar). Jika alas digeser menjadi 4 m, tinggi = √(5²−4²) = 3 m (Benar). Dan sifat ketaksamaan segitiga 5 < 3 + 4 (Benar).',
    feedbackIncorrect:
      'Ketiga pernyataan tersebut sebenarnya BENAR! Ketika kaki tangga digeser 1 m menjauh dari 3 m menjadi 4 m, tingginya turun dari 4 m menjadi 3 m, dan 5 selalu lebih kecil dari 3 + 4 = 7.',
  },
  {
    id: 'Q28',
    number: 28,
    topic: 'pythagoras',
    topicLabel: 'Teorema Pythagoras',
    type: 'BS',
    competency: 'Menalar',
    difficultyWeight: 3,
    stimulusTitle: 'Jarak Langsung Dua Menara Pantau Kebakaran Lahan',
    readingPassage:
      'Untuk mengantisipasi kabut asap pada musim kemarau di wilayah sekitar Kecamatan Wanaraya, tim relawan membangun dua menara pantau sederhana. Menara A berada 12 kilometer di sebelah barat posko utama, sedangkan Menara B berada 16 kilometer di sebelah selatan posko utama yang membentuk sudut siku-siku tepat di posko. Namun karena medan rawa di antara kedua menara berair dalam, tim logistik hanya bisa menggunakan alat komunikasi radio langsung jarak udara atau menempuh jalan darat memutar melalui posko utama. Siswa diajak menalar selisih jarak pancaran sinyal radio langsung dengan rute jalan darat memutar.',
    visual: {
      kind: 'pythagoras_diagram',
      title: 'Posisi Menara Pantau A, Posko Utama, dan Menara B',
      subtitle: 'Jarak darat melalui posko vs jarak udara langsung',
      sideALabel: '12 km (Barat)',
      sideBLabel: '16 km (Selatan)',
      hypotenuseLabel: 'Jarak Udara A–B = ?',
      pointA: 'Menara A',
      pointB: 'Posko Utama (90°)',
      pointC: 'Menara B',
      contextCaption: 'Bandingkan jarak darat (12 + 16) dengan jarak udara',
    },
    prompt:
      'Tentukan BENAR atau SALAH setiap pernyataan analisis jarak menara pantau berikut!',
    statements: [
      'Jarak udara langsung dari Menara A ke Menara B adalah 20 km.',
      'Jarak tempuh darat dari Menara A ke Menara B melalui posko utama adalah 28 km.',
      'Selisih antara rute darat dan jarak udara langsung adalah 10 km.',
    ],
    correctBooleans: [true, true, false],
    feedbackCorrect:
      'Analisis tepat! Jarak udara = √(12² + 16²) = √400 = 20 km (Benar), rute darat = 12 + 16 = 28 km (Benar), sehingga selisihnya 28 − 20 = 8 km, bukan 10 km (Salah).',
    feedbackIncorrect:
      'Hati-hati menghitung pengurangan di pernyataan ketiga! Jarak udara = √(144 + 256) = √400 = 20 km. Rute darat = 12 + 16 = 28 km. Selisih keduanya adalah 28 − 20 = 8 km (bukan 10 km).',
  },

  // ==================== 5. PLSV & PtLSV (Q29 - Q35) ====================
  {
    id: 'Q29',
    number: 29,
    topic: 'plsv',
    topicLabel: 'PLSV & PtLSV',
    type: 'PG',
    competency: 'Memahami',
    difficultyWeight: 1,
    isListeningFocus: true,
    stimulusTitle: 'Neraca Timbangan Paket Jeruk Pasar Minggu Wanaraya',
    readingPassage:
      'Di Pasar Minggu Wanaraya, Bu Siti menjual jeruk Siam lokal dalam kemasan kantong seragam yang beratnya masing-masing sama. Untuk meyakinkan pembeli bahwa timbangannya pas, Bu Siti meletakkan tiga kantong jeruk yang masing-masing beratnya dimisalkan x kilogram ditambah satu anak timbangan kecil 2 kilogram di piringan kiri neraca dua lengan. Di piringan kanan, terdapat satu anak timbangan besi besar bertuliskan 14 kilogram sehingga kedua lengan neraca tepat seimbang sejajar. Pembeli dan siswa SMPN 1 Wanaraya yang ikut berbelanja dapat langsung mengetahui berat satu kantong jeruk dengan memodelkannya sebagai persamaan linier satu variabel.',
    visual: {
      kind: 'scale_equation',
      title: 'Neraca Timbangan Jeruk Bu Siti (Seimbang)',
      subtitle: 'Model matematika: 3x + 2 = 14',
      leftPan: '3 kantong (3x) + 2 kg',
      rightPan: '14 kg',
      relationSymbol: '=',
    },
    prompt:
      'Berat masing-masing satu kantong jeruk (nilai x) pada timbangan seimbang tersebut adalah ....',
    options: ['3 kg', '4 kg', '5 kg', '6 kg'],
    correctIndex: 1,
    feedbackCorrect:
      'Hebat! Dari 3x + 2 = 14, kurangi kedua ruas dengan 2 menjadi 3x = 12, lalu bagi 3 sehingga x = 4 kg per kantong.',
    feedbackIncorrect:
      'Yuk pahami konsep kesetimbangan neraca! Agar tersisa 3 kantong (3x) di piringan kiri, ambil 2 kg dari kedua sisi: 3x = 14 − 2 = 12. Kemudian bagi 12 dengan 3 kantong sehingga setiap kantong (x) beratnya 4 kg.',
  },
  {
    id: 'Q30',
    number: 30,
    topic: 'plsv',
    topicLabel: 'PLSV & PtLSV',
    type: 'PG',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Pembelian Buku Tulis & Penggaris di Koperasi Siswa SMPN 1 Wanaraya',
    readingPassage:
      'Koperasi Siswa (Kopsis) SMPN 1 Wanaraya menyediakan perlengkapan belajar dengan harga terjangkau bagi siswa kelas delapan. Pada jam istirahat, Dika membeli lima buah buku tulis bergaris dengan harga yang sama dan sebuah penggaris segitiga seharga Rp4.000. Di meja kasir, Dika menyerahkan selembar uang Rp50.000 dan menerima uang kembalian sebesar Rp16.000 dari petugas koperasi. Agar dapat mencatat rincian harga satuan barang di buku kas hariannya, Dika menuliskan persamaan aljabar sederhana dengan memisalkan harga satu buku tulis sebagai variabel b. Mari bantu Dika menghitung harga satu buah buku tulis tersebut.',
    visual: {
      kind: 'scale_equation',
      title: 'Keseimbangan Transaksi Kopsis SMPN 1 Wanaraya',
      subtitle: 'Total bayar = Uang diserahkan − Kembalian',
      leftPan: '5 buku (5b) + Rp4.000',
      rightPan: 'Rp50.000 − Rp16.000 (Rp34.000)',
      relationSymbol: '=',
    },
    prompt:
      'Harga satu buah buku tulis yang dibeli Dika di Kopsis adalah ....',
    options: ['Rp5.000', 'Rp6.000', 'Rp6.800', 'Rp7.000'],
    correctIndex: 1,
    feedbackCorrect:
      'Cerdas! Total belanja = 50.000 − 16.000 = 34.000. Jadi 5b + 4.000 = 34.000 → 5b = 30.000 → b = Rp6.000.',
    feedbackIncorrect:
      'Cermati kalimat uang kembaliannya: uang yang terpakai hanya 50.000 − 16.000 = Rp34.000. Kurangi dengan harga penggaris Rp4.000 menjadi Rp30.000 untuk 5 buku, sehingga 1 buku = 30.000 ÷ 5 = Rp6.000.',
  },
  {
    id: 'Q31',
    number: 31,
    topic: 'plsv',
    topicLabel: 'PLSV & PtLSV',
    type: 'PG',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Batas Muatan Perahu Pengangkut Hasil Kebun Wanaraya',
    readingPassage:
      'Untuk menjaga keselamatan pelayaran di saluran irigasi primer Wanaraya, perahu kelotok milik Pak Budi memiliki kapasitas daya angkut maksimal tidak lebih dari 450 kilogram dalam sekali jalan. Saat ini, Pak Budi sendiri bersama perlengkapan mesin di atas perahu sudah memiliki berat total 90 kilogram. Pak Budi ingin memuat peti-peti kayu berisi buah jeruk di mana setiap peti memiliki berat rata-rata 30 kilogram. Jika banyak peti yang boleh diangkut dinyatakan dengan variabel p, situasi keamanan muatan perahu tersebut harus dinyatakan menggunakan pertidaksamaan linier satu variabel agar perahu tidak kelebihan beban dan tetap aman berlayar.',
    visual: {
      kind: 'scale_equation',
      title: 'Batas Aman Muatan Perahu Kelotok Pak Budi',
      subtitle: 'Muatan total tidak boleh melebihi 450 kg',
      leftPan: '30p + 90 kg',
      rightPan: '450 kg (Maksimal)',
      relationSymbol: '≤',
      numberLineHint: 'p adalah bilangan cacah paling banyak ... peti',
    },
    prompt:
      'Banyaknya peti jeruk MAKSIMAL yang boleh diangkut Pak Budi dalam sekali jalan adalah ....',
    options: ['10 peti', '11 peti', '12 peti', '15 peti'],
    correctIndex: 2,
    feedbackCorrect:
      'Tepat sekali! Modelnya 30p + 90 ≤ 450 → 30p ≤ 360 → p ≤ 12. Jadi maksimal 12 peti jeruk agar perahu tetap aman!',
    feedbackIncorrect:
      'Perhatikan berat bawaan awal 90 kg! Kurangi kapasitas maksimal 450 kg dengan 90 kg terlebih dahulu: 30p ≤ 360. Lalu bagi 360 dengan 30 kg per peti sehingga diperoleh p ≤ 12 peti.',
  },
  {
    id: 'Q32',
    number: 32,
    topic: 'plsv',
    topicLabel: 'PLSV & PtLSV',
    type: 'BS',
    competency: 'Menalar',
    difficultyWeight: 3,
    stimulusTitle: 'Anggaran Belanja Hadiah Lomba Cerdas Cermat Kelas 8',
    readingPassage:
      'Panitia OSIS SMPN 1 Wanaraya mendapat dana sebesar Rp300.000 untuk membeli paket hadiah alat tulis bagi pemenang lomba cerdas cermat antarkelas 8A dan 8B. Setiap paket hadiah terdiri atas dua buku catatan dan satu kotak pensil warna. Harga satu kotak pensil warna adalah Rp15.000, sedangkan harga satu buku catatan belum diketahui pasti dan dimisalkan h rupiah. Panitia berencana membeli tepat 6 paket hadiah dan mengharuskan total belanja kurang dari atau sama dengan anggaran yang tersedia. Siswa diajak menalar model pertidaksamaan yang melibatkan tanda kurung untuk menentukan batas harga maksimal satu buku catatan.',
    visual: {
      kind: 'scale_equation',
      title: 'Model Anggaran 6 Paket Hadiah Lomba OSIS',
      subtitle: '6 × (2 buku + 1 kotak pensil) ≤ Rp300.000',
      leftPan: '6(2h + 15.000)',
      rightPan: '300.000',
      relationSymbol: '≤',
      numberLineHint: 'Sederhanakan dengan membagi kedua ruas dengan 6',
    },
    prompt:
      'Tentukan BENAR atau SALAH setiap pernyataan mengenai batas anggaran paket hadiah OSIS berikut!',
    statements: [
      'Model pertidaksamaan yang sesuai untuk total belanja panitia adalah 6(2h + 15.000) ≤ 300.000.',
      'Harga maksimal satu buku catatan (h) yang memenuhi anggaran adalah Rp17.500.',
      'Jika panitia memilih buku catatan seharga Rp20.000 per buah, anggaran Rp300.000 masih mencukupi.',
    ],
    correctBooleans: [true, true, false],
    feedbackCorrect:
      'Hebat sekali! Model 6(2h + 15.000) ≤ 300.000 (Benar) menghasilkan h ≤ Rp17.500 (Benar). Jika h = Rp20.000, total belanja = 6(55.000) = Rp330.000 yang melebihi anggaran (Salah).',
    feedbackIncorrect:
      'Perhatikan pernyataan ketiga: jika buku catatan berharga Rp20.000, maka 1 paket berharga 2(20.000) + 15.000 = Rp55.000, sehingga 6 paket = Rp330.000 (melebihi anggaran Rp300.000). Jadi pernyataan ketiga Salah.',
  },
  {
    id: 'Q33',
    number: 33,
    topic: 'plsv',
    topicLabel: 'PLSV & PtLSV',
    type: 'MCMA',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    stimulusTitle: 'Pagar Bambu Keliling Kebun Sekolah Bentuk Persegi Panjang',
    readingPassage:
      'Siswa kelas 8B SMPN 1 Wanaraya bergotong royong membuat pagar kebun tanaman obat keluarga berbentuk persegi panjang di samping ruang guru. Ketua kelas mencatat panjang kebun dirancang 4 meter lebih panjang daripada lebarnya. Jika lebar kebun dimisalkan dengan huruf l meter, maka panjang kebun dapat ditulis sebagai (l + 4) meter. Sekolah hanya menyediakan bahan pagar bambu sepanjang 36 meter untuk mengelilingi seluruh kebun tersebut tepat satu putaran penuh. Sebelum mulai memotong bambu dan menancapkan tiang sudut, siswa membuat model keliling persegi panjang menggunakan persamaan linier satu variabel untuk menemukan ukuran pastinya.',
    visual: {
      kind: 'scale_equation',
      title: 'Model Keliling Kebun Tanaman Obat Kelas 8B',
      subtitle: 'Keliling = 2(panjang + lebar) = 36 meter',
      leftPan: '2((l + 4) + l)',
      rightPan: '36 meter',
      relationSymbol: '=',
    },
    prompt:
      'Pilihlah semua pernyataan yang BENAR mengenai ukuran kebun tanaman obat kelas 8B tersebut!',
    statements: [
      'Persamaan yang memodelkan keliling kebun adalah 2(2l + 4) = 36.',
      'Lebar kebun (l) yang diperoleh adalah 7 meter.',
      'Panjang kebun adalah 11 meter.',
      'Luas kebun tanaman obat tersebut adalah 36 meter persegi.',
    ],
    correctIndices: [0, 1, 2],
    feedbackCorrect:
      'Tepat sekali! 2(2l + 4) = 36 → 2l + 4 = 18 → 2l = 14 → l = 7 meter, sehingga panjang = 7 + 4 = 11 meter!',
    feedbackIncorrect:
      'Cek pernyataan keempat! Yang bernilai 36 meter adalah KELILING kebun, bukan luasnya. Luas kebun = panjang × lebar = 11 × 7 = 77 m². Sedangkan pernyataan 1, 2, dan 3 semuanya benar.',
  },
  {
    id: 'Q34',
    number: 34,
    topic: 'plsv',
    topicLabel: 'PLSV & PtLSV',
    type: 'MCMA',
    competency: 'Mengaplikasikan',
    difficultyWeight: 2,
    isListeningFocus: true,
    stimulusTitle: 'Syarat Nilai Lulus Minimal Try Out SAS Matematika',
    readingPassage:
      'Untuk memotivasi siswa kelas 8A dan 8B SMPN 1 Wanaraya menghadapi Sumatif Akhir Semester (SAS), guru matematika menetapkan target ketuntasan belajar harian. Nilai akhir diperoleh dari dua kali nilai tugas praktik ditambah sepuluh poin keaktifan diskusi, dan hasilnya harus minimal 76 agar siswa dinyatakan tuntas tanpa remedial. Aturan tersebut dapat dituliskan dalam bentuk pertidaksamaan 2x + 10 ≥ 76, di mana x adalah nilai tugas praktik siswa. Beberapa siswa mencoba menghitung berapa nilai tugas praktik minimal yang harus mereka capai, serta menguji sifat perubahan tanda pertidaksamaan saat melakukan operasi hitung.',
    visual: {
      kind: 'scale_equation',
      title: 'Pertidaksamaan Target Ketuntasan SAS Matematika',
      subtitle: '2x + 10 ≥ 76 (nilai minimal tuntas)',
      leftPan: '2x + 10',
      rightPan: '76',
      relationSymbol: '≥',
      numberLineHint: 'Cari batas bawah x untuk bilangan bulat',
    },
    prompt:
      'Pilih semua pernyataan yang BENAR terkait pertidaksamaan target ketuntasan tersebut!',
    statements: [
      'Penyelesaian dari pertidaksamaan 2x + 10 ≥ 76 adalah x ≥ 33.',
      'Jika siswa mendapat nilai praktik x = 32, ia sudah dinyatakan tuntas.',
      'Jika suatu pertidaksamaan dikalikan atau dibagi bilangan negatif, tanda pertidaksamaan harus dibalik.',
      'Nilai praktik x = 35 memenuhi syarat ketuntasan belajar tersebut.',
    ],
    correctIndices: [0, 2, 3],
    feedbackCorrect:
      'Hebat! 2x ≥ 66 → x ≥ 33 (Benar), membagi/mengali dengan bilangan negatif membalik tanda (Benar), dan x = 35 ≥ 33 sehingga tuntas (Benar).',
    feedbackIncorrect:
      'Periksa pernyataan kedua! Jika x = 32, maka 2(32) + 10 = 74, yang masih kurang dari target minimal 76. Jadi x = 32 belum tuntas. Pernyataan 1, 3, dan 4 adalah benar.',
  },
  {
    id: 'Q35',
    number: 35,
    topic: 'plsv',
    topicLabel: 'PLSV & PtLSV',
    type: 'BS',
    competency: 'Menalar',
    difficultyWeight: 3,
    stimulusTitle: 'Perbandingan Tarif Sewa Perahu Wisata Sungai Wanaraya',
    readingPassage:
      'Saat kegiatan karya wisata edukasi desa, pengurus kelas delapan membandingkan dua penawaran tarif sewa perahu wisata susur sungai sekitar Wanaraya. Pemilik Perahu A menawarkan biaya awal Rp50.000 ditambah Rp20.000 per jam pemakaian, sedangkan Pemilik Perahu B menawarkan biaya awal Rp80.000 ditambah Rp15.000 per jam pemakaian. Jika lama sewa dinyatakan dengan t jam, siswa diminta menalar kapan tarif kedua perahu menjadi sama persis dan kapan Perahu B lebih hemat dibanding Perahu A. Analisis pertidaksamaan ini sangat berguna agar kas kelas bisa digunakan secara bijak dan hemat.',
    visual: {
      kind: 'line_chart',
      title: 'Perbandingan Biaya Sewa Perahu A & Perahu B (Ribu Rp)',
      subtitle: 'Biaya Perahu A: 50 + 20t vs Perahu B: 80 + 15t',
      yAxisLabel: 'Ribu Rupiah',
      data: [
        { label: '2 Jam (A=90, B=110)', value: 90, unit: 'rb' },
        { label: '4 Jam (A=130, B=140)', value: 130, unit: 'rb' },
        { label: '6 Jam (A=170, B=170)', value: 170, unit: 'rb', highlight: true },
        { label: '8 Jam (A=210, B=200)', value: 210, unit: 'rb' },
      ],
    },
    prompt:
      'Tentukan BENAR atau SALAH setiap pernyataan perbandingan tarif sewa perahu tersebut!',
    statements: [
      'Kedua perahu memiliki total biaya yang sama persis jika disewa selama t = 6 jam.',
      'Untuk pemakaian kurang dari 6 jam (misal 4 jam), Perahu A lebih murah daripada Perahu B.',
      'Agar Perahu B lebih murah daripada Perahu A (80 + 15t < 50 + 20t), lama sewa harus kurang dari 6 jam.',
    ],
    correctBooleans: [true, true, false],
    feedbackCorrect:
      'Analisis tingkat tinggi yang luar biasa! 50 + 20t = 80 + 15t → 5t = 30 → t = 6 jam (Benar). Untuk t = 4 jam, A = Rp130rb < B = Rp140rb (Benar). Perahu B baru lebih murah saat 5t > 30 → t > 6 jam (bukan kurang dari 6 jam, sehingga pernyataan ketiga Salah).',
    feedbackIncorrect:
      'Cermati penyelesaian pertidaksamaan pernyataan ketiga: 80 + 15t < 50 + 20t menjadi 30 < 5t atau t > 6 jam! Artinya Perahu B baru lebih hemat jika disewa LEBIH dari 6 jam (lihat data 8 jam: A = 210rb, B = 200rb).',
  },
];
