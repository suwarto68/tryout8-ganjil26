# Security Specification — Try Out SAS Matematika Kelas 8 SMPN 1 Wanaraya

## 1. Data Invariants
1. Setiap `quiz_submissions/{submissionId}` wajib memiliki `studentName` (2–80 karakter), `className` (`'8A'` atau `'8B'`), `score` (`0..100`), `totalQuestions` (`== 35`), `adaptiveTier` (`'Dasar'|'Menengah'|'Mahir'`), dan `submittedAt == request.time`.
2. Tidak ada PII sensitif (email, nomor HP, alamat rumah) yang disimpan pada `quiz_submissions`.
3. Hanya guru terotorisasi (`isAdmin()`: `ujiansmpn1wnry@gmail.com` terverifikasi atau terdaftar di `/admins/{uid}`) yang dapat membaca daftar seluruh hasil siswa (`list`), membaca detail dokumen (`get`), atau menghapus data (`delete`).
4. Siswa hanya dapat mengirim (`create`) hasil baru dengan kunci dan tipe data tervalidasi ketat tanpa kemampuan menimpa/mengubah (`update`) atau menghapus (`delete`) data siswa lain.

## 2. The Dirty Dozen Payloads (Verified Denied)
1. Unauthenticated `list` on `/quiz_submissions` -> PERMISSION_DENIED
2. Non-admin authenticated `list` on `/quiz_submissions` -> PERMISSION_DENIED
3. Non-admin `delete` on `/quiz_submissions/{id}` -> PERMISSION_DENIED
4. `update` on `/quiz_submissions/{id}` by student -> PERMISSION_DENIED
5. Shadow field (`isAdmin: true`) inside `quiz_submissions` `create` -> PERMISSION_DENIED
6. Invalid `className: "9C"` inside `quiz_submissions` `create` -> PERMISSION_DENIED
7. Out-of-bounds `score: 150` inside `quiz_submissions` `create` -> PERMISSION_DENIED
8. Oversized `studentName` (> 80 chars) -> PERMISSION_DENIED
9. Spoofed client timestamp (`submittedAt != request.time`) -> PERMISSION_DENIED
10. Unverified admin email (`email_verified == false`) reading `/quiz_submissions` -> PERMISSION_DENIED
11. Non-admin creating document in `/admins/{uid}` (privilege escalation) -> PERMISSION_DENIED
12. Invalid path ID containing special characters (`../bad`) -> PERMISSION_DENIED
