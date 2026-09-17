from pathlib import Path
root=Path('C:/Users/Joshua/OneDrive/Documents/Kultivate')
s=(root/'tmp/c01l01-build/build_deck.mjs').read_text(encoding='utf-8')
changes={
 'tmp/c01l01-build':'tmp/c01l01-v2',
 'outputs/Kultivate_Learn_C01L01_Sample_2026-09-14':'outputs/Kultivate_Learn_C01L01_Sample_v2_Bahasa_Santai_2026-09-14',
 'C01L01_Teaching_Slides.pptx':'C01L01_Teaching_Slides_v2.pptx',
 'Menghubungkan pencarian\\ndengan peluang bisnis':'Gimana pencarian bisa\\nbuka peluang bisnis',
 'Satu lesson, satu keputusan atau mental model':'Satu lesson, satu keputusan atau cara memahami masalah',
 'Kondisi ilustratif':'Contoh situasi',
 'YANG SUDAH TERLIHAT':'YANG UDAH KELIHATAN',
 'Website makin\\nbanyak dikunjungi':'Website kita makin\\nbanyak dikunjungi',
 'YANG PERLU DIPERIKSA':'YANG MASIH PERLU DICEK',
 'Kebutuhan siapa\\nyang terbantu?':'Siapa yang datang,\\ndan mereka butuh apa?',
 'Apakah ada inquiry yang sesuai?':'Inquiry yang masuk cocok nggak?',
 'Kebutuhan terhadap solusi':'Kebutuhan orang akan solusi',
 'Apakah kebutuhan itu dapat kita layani?':'Kebutuhannya cocok sama layanan kita nggak?',
 'Mengenali\\nmasalah':'Kenali\\nmasalah',
 'Memahami\\nsolusi':'Pahami\\nsolusinya',
 'Menilai kecocokan\\ndan bukti':'Cek kecocokan\\ndan buktinya',
 'Mengambil\\nlangkah berikutnya':'Ambil langkah\\nberikutnya',
 'Momen dapat berulang atau terlewati':'Orang bisa bolak-balik atau lewati beberapa momen',
 'Informasi mengikuti keputusan pembeli':'Jawaban yang calon pembeli butuhkan',
 'Masalah apa yang perlu ditangani?':'Masalah apa yang perlu diberesin?',
 'Bagaimana solusi bekerja?':'Solusinya kerja gimana?',
 'Cocok dan bisa dipercaya?':'Cocok dan bisa dipercaya nggak?',
 'Bagaimana memulai?':'Gimana cara mulainya?',
 'Satu halaman dapat membantu lebih dari satu momen':'Satu halaman bisa bantu lebih dari satu momen',
 'Bukti menuju peluang bisnis':'Dari muncul di search sampai peluang yang cocok',
 'Peta pemeriksaan, bukan funnel terukur':'Tiap bagian perlu dicek • Bukan funnel terukur',
 "['Kemunculan','Konteks kebutuhan','Pesan diterima','Kecocokan diperiksa']":"['Muncul di search','Kebutuhannya nyambung','Pesan beneran masuk','Kecocokannya dicek']",
 'Setiap perpindahan perlu bukti':'Tiap langkah perlu bukti',
 'Peluang sesuai belum berarti penjualan':'Peluang yang cocok belum tentu jadi penjualan',
 'Klik kontak belum membuktikan inquiry':'Klik kontak belum tentu jadi inquiry',
 'Pesan benar-benar\\nditerima':'Pesan beneran\\nmasuk',
 'Kebutuhan\\ndiperiksa tim':'Tim cek\\nkebutuhannya',
 'Key event mencatat tindakan penting,\\nbukan otomatis peluang yang sesuai':'Key event cuma nyatet tindakan penting,\\nbelum otomatis jadi peluang yang cocok',
 'Perlu memahami masalah':'Perlu paham masalahnya',
 'Perawatan berkala\\nmencakup apa':'Perawatan berkala\\ntermasuk apa aja',
 'Perlu memahami lingkup layanan':'Perlu tahu apa aja yang dikerjain',
 'Kecocokan diperiksa sebelum menjadi peluang':'Inquiry masuk, cocoknya tetap perlu dicek',
 'Area layanan\\nCakupan pekerjaan\\nBukti relevan':'Area yang dilayani\\nPekerjaan yang termasuk\\nBukti yang bisa dicek',
 'Kirim kebutuhan\\nPahami tindak lanjut':'Kirim kebutuhan\\nTahu proses setelahnya',
 'Permintaan masuk masih perlu diperiksa kecocokannya':'Permintaan masuk tetap perlu dicek cocoknya',
 'Observasi dan hipotesis':'Yang kita lihat dan yang masih kita duga',
 'Area layanan tidak tercantum di halaman':'Info area layanan belum ada di halaman',
 'Calon pembeli ragu lalu batal menghubungi':'Calon pembeli ragu lalu batal hubungi bisnis',
 'BUKTI BERIKUTNYA':'LANGKAH CEK',
 'Periksa pertanyaan lokasi dalam inquiry':'Cek pertanyaan soal lokasi di inquiry yang masuk',
 'Peta awal untuk layanan Anda':'Sekarang coba di layanan Anda',
 'Catat satu gap atau unknown':'Catat yang masih kurang jelas',
 'Tentukan bukti berikutnya':'Pilih bukti yang mau kita cek',
 'Belum tahu\\nperilaku search?':'Belum tahu cara\\npelanggan pakai search?',
 'Periksa dahulu.':'Cari tahu dulu.',
 'Inquiry relevan\\nterlambat ditangani?':'Inquiry yang cocok\\nlama dibalas?',
 'Periksa tindak lanjut.':'Cek tindak lanjutnya.',
 'Search dinilai lewat\\nkeputusan yang dibantunya':'Search bisa bantu orang\\nambil keputusan',
 'Periksa bukti menuju inquiry yang sesuai.':'Cek apakah inquiry-nya cocok sama bisnis kita.',
 'Traffic saja belum membuktikan peluang bisnis.':'Traffic aja belum cukup buat bilang ada peluang bisnis.',
 'Worksheet C01L01 bersifat opsional':'Worksheet boleh dicoba, belajar tetap bisa lanjut',
}
for a,b in changes.items():
 if a not in s: raise ValueError('Missing '+a)
 s=s.replace(a,b)
# Give the rewritten copy enough room without changing the diagram structure.
s=s.replace("514,120,41", "514,145,37")
s=s.replace("514,85,29", "514,85,28")
s=s.replace("529,165,36", "590,175,34")
s=s.replace("470,155,36", "470,155,33")
s=s.replace("353,92,30", "353,100,27")
s=s.replace("1120,60,37", "1120,60,35")
(root/'tmp/c01l01-v2/build_deck.mjs').write_text(s,encoding='utf-8')
print('Deck source updated with',len(changes),'wording changes')
