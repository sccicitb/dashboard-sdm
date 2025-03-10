import json
from datetime import datetime

# Original JSON data
data = {
        "idh": {
            "2nB84lo4goLLi32sMTwp": {
                "specialist": "ITB ",
                "alamat": "Gitarja",
                "phone": 650000000,
                "status": "negosiasi",
                "timestamp": "03-02-2025",
                "nama": "Smart X Healtcare Simulator (Layanan Kesehatan)",
                "__collections__": {}
            },
            "36Bhe0AjaXvQIP6FU9fs": {
                "nama": "Telemedicine ",
                "specialist": "Holistik Wellness Consultant",
                "alamat": "Alawi, Niko",
                "phone": 100000000,
                "status": "proposal",
                "timestamp": "03-02-2025",
                "__collections__": {}
            },
            "3pqhUY6fPZgcKYK1FQSV": {
                "nama": "SIMRS",
                "phone": 200000000,
                "alamat": "Alawi, Budi",
                "status": "inisiasi",
                "timestamp": "21-10-2024",
                "specialist": "RS Proklamasi Karawang",
                "__collections__": {}
            },
            "6LkBU1gMlDCg6ctKK3Gu": {
                "specialist": "USTB",
                "phone": 0,
                "status": "proposal",
                "nama": "Development IT Product",
                "alamat": "Gitarja",
                "timestamp": "09-12-2024",
                "__collections__": {}
            },
            "7WvekZ0nhbArYONFs1cI": {
                "nama": "RME Hospital",
                "specialist": "Intermedik",
                "phone": 0,
                "alamat": "Gitardja, Alawi",
                "status": "proposal",
                "timestamp": "09-12-2024",
                "__collections__": {}
            },
            "7uIbNV4Nn990GlhA6dH3": {
                "nama": "DianeshaCare",
                "alamat": "Alawi, Anton",
                "specialist": "Fazza Care, Pak cencen  (Rumah Perawatan Luka)",
                "phone": 100000000,
                "status": "proposal",
                "timestamp": "03-02-2025",
                "__collections__": {}
            },
            "8XxIc725xyFHOnlt0bsX": {
                "specialist": "RS Lanud Sulaiman Bandung",
                "phone": 492454000,
                "alamat": "Alawi",
                "nama": "SIM RS T.A 2025",
                "status": "inisiasi",
                "timestamp": "16-12-2024",
                "__collections__": {}
            },
            "AEXUeSr45vQhUshO8SXK": {
                "specialist": "Qimtronics ",
                "phone": 0,
                "alamat": "Alawi",
                "status": "inisiasi",
                "timestamp": "02-09-2024",
                "nama": "DianeshaCare (+Smart Watch & Blood Pressure Tools)",
                "__collections__": {}
            },
            "EEJuibWISTEQHxwbrKPQ": {
                "specialist": "RS Melinda 2",
                "alamat": "Alawi",
                "status": "inisiasi",
                "nama": "Shelfa",
                "phone": 200000000,
                "timestamp": "23-09-2024",
                "__collections__": {}
            },
            "FORQ2GiKG6ojZz2OEwJx": {
                "specialist": "RS Intan Husada Garut",
                "status": "inisiasi",
                "phone": 64500000,
                "nama": "Smart Hospital + Telemedicine",
                "timestamp": "02-09-2024",
                "alamat": "Dona, Alawi",
                "__collections__": {}
            },
            "FYWM46XA0GFCWJxsSbts": {
                "nama": "Shelfa",
                "specialist": "RSUD Gunung Djati Kota Cirebon",
                "phone": 200000000,
                "alamat": "Alawi, Anton",
                "status": "inisiasi",
                "timestamp": "07-10-2024",
                "__collections__": {}
            },
            "Ff7KhaLbuckkO6pI16uy": {
                "nama": "SIM RS + RME",
                "specialist": "RSUD Malangbong Garut",
                "alamat": "Alawi",
                "status": "inisiasi",
                "phone": 150000000,
                "timestamp": "25-11-2024",
                "__collections__": {}
            },
            "I8EodfGpHOMEMnn99O3O": {
                "specialist": "RS Santosa Kopo",
                "alamat": "Alawi",
                "status": "inisiasi",
                "nama": "Shelfa",
                "phone": 200000000,
                "timestamp": "23-09-2024",
                "__collections__": {}
            },
            "P7q6kbkg2ugecqEtHqEY": {
                "nama": "All Produk",
                "specialist": "RS Al Ihsan Bandung",
                "alamat": "Alawi",
                "status": "inisiasi",
                "phone": 64500000,
                "timestamp": "12-08-2024",
                "__collections__": {}
            },
            "RA9a6wGimC1Cm395p6hE": {
                "specialist": "ITB",
                "nama": "NTU WP-4 (Use Case Air Polution)",
                "phone": 186896250,
                "alamat": "Gitarja",
                "status": "kontrak",
                "timestamp": "03-02-2025",
                "__collections__": {}
            },
            "RCI0Zp7bnkqM2ncSUHIa": {
                "nama": "SIM RS RME",
                "specialist": "Lab Kes. Prov Jabar",
                "phone": 0,
                "alamat": "Alawi, Budi",
                "status": "inisiasi",
                "timestamp": "17-09-2024",
                "__collections__": {}
            },
            "RD6RcITupoKStZkJQYT2": {
                "nama": "Smart Parking Hospital",
                "specialist": "RS Otista Soreang",
                "alamat": "Alawi",
                "status": "inisiasi",
                "phone": 200000000,
                "timestamp": "23-09-2024",
                "__collections__": {}
            },
            "RXKUZKwAXwvJRXtspHfK": {
                "specialist": "PMI Jawa Barat",
                "alamat": "Andhika (Mitra PMI jawa Barat)",
                "nama": "Awan Kesehatan T.A 2025",
                "status": "proposal",
                "phone": 200000000,
                "timestamp": "03-02-2025",
                "__collections__": {}
            },
            "SFjTEttjmzO12hrWFv7F": {
                "nama": "All Produk",
                "specialist": "RSHS Bandung",
                "phone": 0,
                "alamat": "Anton, Alawi",
                "status": "inisiasi",
                "timestamp": "23-12-2024",
                "__collections__": {}
            },
            "Y56l6uC6lwTkMim1w5Gm": {
                "alamat": "Alawi",
                "status": "inisiasi",
                "timestamp": "01-07-2024",
                "nama": "HR Management ",
                "specialist": "Stikes Karsa Husada",
                "phone": 4500000,
                "__collections__": {}
            },
            "YG90jv2pegiCrOvbNLq4": {
                "nama": "DianeshaCare",
                "specialist": "Sustainable Intelligence Dispenser",
                "phone": 9750000,
                "alamat": "Andhika (Mitra)",
                "status": "inisiasi",
                "timestamp": "02-09-2024",
                "__collections__": {}
            },
            "bZJ0zRw4BnTUj1o7tfnB": {
                "nama": "All Produk",
                "specialist": "RS Guntur Garut",
                "phone": 0,
                "alamat": "Alawi",
                "status": "inisiasi",
                "timestamp": "15-10-2024",
                "__collections__": {}
            },
            "eVqU4BLkvudxiZUtREA3": {
                "alamat": "Alawi",
                "specialist": "RS Nurhayati Garut",
                "nama": "Aplikasi WA Blast Reminder Kontrol Pasien + Dashboard",
                "phone": 150000000,
                "status": "negosiasi",
                "timestamp": "03-02-2025",
                "__collections__": {}
            },
            "gGh0O3RejG5nv54JeGaa": {
                "nama": "Shelfa",
                "specialist": "RS Mitra Plumbon",
                "phone": 200000000,
                "alamat": "Alawi, Anton",
                "status": "inisiasi",
                "timestamp": "07-10-2024",
                "__collections__": {}
            },
            "gfxPYsK3WpM4asOSGbHs": {
                "specialist": "Dinkes Garut",
                "alamat": "Alawi",
                "nama": "Awan Kesehatan T.A 2025",
                "phone": 200000000,
                "status": "proposal",
                "timestamp": "02-12-2024",
                "__collections__": {}
            },
            "hl2UOp51ljuc42DptRDF": {
                "nama": "Awarness Penyakit Diabetik",
                "specialist": "MSJ dr. Agung",
                "phone": 200000000,
                "alamat": "Alawi",
                "status": "inisiasi",
                "timestamp": "26-08-2024",
                "__collections__": {}
            },
            "hpReGaHIN7WFYhggObLe": {
                "specialist": "PT. Natura Alamindo Utama",
                "alamat": "Alawi",
                "status": "inisiasi",
                "nama": "Telemedicine T.A 2025",
                "timestamp": "02-09-2024",
                "phone": 376400000,
                "__collections__": {}
            },
            "ihYobkaRzoi0kKg8rba4": {
                "nama": "Shelfa",
                "specialist": "RSU Tk.III Ciremai",
                "phone": 200000000,
                "alamat": "Alawi, Anton",
                "status": "inisiasi",
                "timestamp": "07-10-2024",
                "__collections__": {}
            },
            "kbayDqpEdXri8c8LYDJp": {
                "nama": "SIM RS",
                "specialist": "RS Mitra keluarga Cileunyi",
                "phone": 200000000,
                "alamat": "Alawi, Budi",
                "status": "inisiasi",
                "timestamp": "21-10-2024",
                "__collections__": {}
            },
            "kccZtaPQerbJ6L7kl2Er": {
                "nama": "Telemedicine ",
                "specialist": "RS Nahdatul Ulama Grup",
                "alamat": "EIU, Alawi",
                "status": "inisiasi",
                "phone": 425332000,
                "timestamp": "12-08-2024",
                "__collections__": {}
            },
            "r9M661Ggd5n0KPvrQvaK": {
                "specialist": "PMI Jawa Barat",
                "status": "inisiasi",
                "timestamp": "02-09-2024",
                "phone": 376400000,
                "alamat": "Andhika (Mitra PMI jawa Barat)",
                "nama": "HR Management T.A 2025",
                "__collections__": {}
            },
            "s9SabQeVmwKpanerruvp": {
                "specialist": "RSUD Bandung Kiwari",
                "alamat": "Alawi",
                "status": "inisiasi",
                "timestamp": "23-09-2024",
                "nama": "Shelfa",
                "phone": 200000000,
                "__collections__": {}
            },
            "wMDzmTZEEB420HFkzrOI": {
                "nama": "Smart Hospital RME",
                "specialist": "RS Unisba Rancaekek",
                "phone": 0,
                "alamat": "Alawi, Budi",
                "status": "inisiasi",
                "timestamp": "17-09-2024",
                "__collections__": {}
            },
            "xiu0CQ3SyMMbCpiwAM2t": {
                "alamat": "Alawi, Niko",
                "specialist": " Owlexa (PT. Lintas Arta)",
                "nama": "Telemedicine T.A 2025",
                "phone": 264000000,
                "status": "negosiasi",
                "timestamp": "03-02-2025",
                "__collections__": {}
            },
            "yYAUxY4Zjil6BSZZMfLX": {
                "nama": "Shelfa",
                "phone": 200000000,
                "alamat": "Alawi, Anton",
                "status": "inisiasi",
                "specialist": "RS Permata Cirebon",
                "timestamp": "04-11-2024",
                "__collections__": {}
            },
            "za6kZGVhH0qSDx3meXyD": {
                "nama": "Indicare-Vet",
                "specialist": "Klinik drh. Eko Garut",
                "status": "proposal",
                "alamat": "Alawi",
                "phone": 100000000,
                "timestamp": "03-02-2025",
                "__collections__": {}
            }
        },
        "ids": {
            "1pQ2NLUSIa0b3ygJatGN": {
                "nama": "VIANA/INARA",
                "specialist": "Pupuk Kujang",
                "status": "proposal",
                "alamat": "Okyza",
                "timestamp": "12-08-2024",
                "phone": 250000000,
                "__collections__": {}
            },
            "9nAnhaSZsIz8bvn6h0dI": {
                "nama": "VIANA HSE",
                "specialist": "Jakarta Propertindo (Persero)",
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "phone": 0,
                "timestamp": "05-08-2024",
                "__collections__": {}
            },
            "AXQ8J4DSgTQfpFLQiKho": {
                "nama": "Kajian Big Data Survey-ID",
                "specialist": "Global Tekno Digital Solusi",
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "phone": 500000000,
                "timestamp": "05-08-2024",
                "__collections__": {}
            },
            "BC8mx5a09pjwodAGe6Jj": {
                "nama": "VIANA Vehicle, crowd detection",
                "specialist": "b3Sahabat, PT",
                "phone": 70000000,
                "alamat": "ardjaka",
                "status": "negosiasi",
                "timestamp": "23-12-2024",
                "__collections__": {}
            },
            "BMM7STqDS5GlsE0rrxia": {
                "nama": "VIANA HSE",
                "specialist": "Harbour Energy Indonesia",
                "phone": 0,
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "timestamp": "12-08-2024",
                "__collections__": {}
            },
            "CKtp1wL23oUKkBYbQpwp": {
                "nama": "VIANA HSE",
                "specialist": "Cabot Corporation",
                "phone": 0,
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "timestamp": "19-08-2024",
                "__collections__": {}
            },
            "ColbwHeTTwIDWskJxP0R": {
                "nama": "HSE Viana",
                "specialist": "Pamapersada Nusantara",
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "phone": 250000000,
                "timestamp": "12-08-2024",
                "__collections__": {}
            },
            "CzlXWusYlYoohWaLTIjZ": {
                "specialist": "MRT Jakarta",
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "nama": "HSE VIANA",
                "phone": 250000000,
                "timestamp": "15-07-2024",
                "__collections__": {}
            },
            "ENIvbl8BCoFZwLV3QZI7": {
                "nama": "Viana HSE",
                "specialist": "Titan Infra Energy",
                "status": "inisiasi",
                "alamat": "Siti Insani",
                "timestamp": "08-07-2024",
                "phone": 0,
                "__collections__": {}
            },
            "FftgVsC4SbTgpiIzOSSP": {
                "nama": "MIND-ID Safety Platform",
                "specialist": "Global Tekno Digital Solusi",
                "alamat": "Ardjaka",
                "phone": 500000000,
                "status": "proposal",
                "timestamp": "26-08-2024",
                "__collections__": {}
            },
            "Fymeiv0PKPw9F2X7oP4l": {
                "specialist": "Adhi Karya",
                "alamat": "ardjaka",
                "status": "inisiasi",
                "nama": "BIM & VIANA Integration, SAP & BIM Integration",
                "timestamp": "12-08-2024",
                "phone": 600000000,
                "__collections__": {}
            },
            "GleLmFWwEg2JAnGGwXbH": {
                "nama": "PUPR",
                "specialist": "SCCIC",
                "alamat": "sccic",
                "status": "kontrak",
                "timestamp": "08-07-2024",
                "phone": 200000000,
                "__collections__": {}
            },
            "HPzUorYydo130r4bz2sn": {
                "nama": "VIANA Pertamina Cepu",
                "specialist": "Berkah Hidup Amanah, PT",
                "phone": 186000000,
                "alamat": "ardjaka",
                "status": "negosiasi",
                "timestamp": "23-12-2024",
                "__collections__": {}
            },
            "KEtfPvTB0qWgEijJBnMm": {
                "specialist": "PT. Cipta Reksa Solusindo",
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "nama": "Chat-bot NLP UNDP",
                "timestamp": "12-08-2024",
                "phone": 2200000000,
                "__collections__": {}
            },
            "KwtyiOHgnCOeiwvGHCcN": {
                "specialist": "Lintasarta",
                "alamat": "Ardjaka",
                "nama": "Samudera Indonesia, PT (Viana Number & Logo Recognition)",
                "phone": 103125000,
                "status": "negosiasi",
                "timestamp": "31-12-2024",
                "__collections__": {}
            },
            "L7KpF2XvWMB2qWm2C7PS": {
                "nama": "Viana Absensi",
                "specialist": "SCCIC ITB",
                "phone": 3360000,
                "alamat": "Ardjaka",
                "status": "kontrak",
                "timestamp": "15-07-2024",
                "__collections__": {}
            },
            "LCzyLgTCxeTr8rzuJLF2": {
                "specialist": "PT. PP Persero",
                "alamat": "Ardjaka",
                "nama": "VIANA SHE",
                "phone": 200000000,
                "status": "negosiasi",
                "timestamp": "23-12-2024",
                "__collections__": {}
            },
            "MiuScratPEOoZx3r1Nim": {
                "nama": "VIANA",
                "specialist": "Jasamarga",
                "phone": 0,
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "__collections__": {}
            },
            "RWs3abfET2vNXQpROewP": {
                "specialist": "PP (Persero), PT",
                "alamat": "Ardjaka",
                "nama": "Deteksi via LIDAR",
                "phone": 250000000,
                "status": "proposal",
                "timestamp": "13-12-2024",
                "__collections__": {}
            },
            "SXkneLZB1136vfvzlJIX": {
                "specialist": "Lintasarta",
                "alamat": "Ardjaka",
                "nama": "Transportasi Jakarta, PT (Viana passanger counting)",
                "phone": 138000000,
                "status": "proposal",
                "timestamp": "04-11-2024",
                "__collections__": {}
            },
            "VSrzzrhPZAGhE71MaYpF": {
                "status": "proposal",
                "specialist": "SCCIC",
                "nama": "Simulator X IIP Smart Mobility",
                "phone": 840000000,
                "alamat": "Siti Insani",
                "timestamp": "31-12-2024",
                "__collections__": {}
            },
            "YDuGvGxYYlx9GPIWln3n": {
                "specialist": "ITB",
                "alamat": "sccic",
                "status": "proposal",
                "nama": "NTU WP-1 Dashboard Smart Mobility-Jasa",
                "phone": 228000000,
                "timestamp": "21-10-2024",
                "__collections__": {}
            },
            "cvA3lh0WhRZLze8bYqE4": {
                "nama": "VIANA/INARA",
                "specialist": "PT. Nusa Alfa Solusi",
                "phone": 0,
                "alamat": "Ardjaka ",
                "status": "inisiasi",
                "__collections__": {}
            },
            "eU7yQGRKiJarHUG7ihHm": {
                "nama": "Smart Campus PPU",
                "specialist": "Politeknik PU",
                "phone": 1000000000,
                "alamat": "Ardjaka",
                "status": "proposal",
                "timestamp": "11-11-2024",
                "__collections__": {}
            },
            "eiQ56hz354oyab5JmP6A": {
                "nama": "PT. Putra Perkasa Abadi VIANA Counting",
                "specialist": "Eterno Global Technologies, PT",
                "phone": 147900000,
                "alamat": "Ardjaka",
                "status": "negosiasi",
                "timestamp": "31-12-2024",
                "__collections__": {}
            },
            "fIpqKNgWD6qmWJs4O6Mp": {
                "nama": "VIANA HSE",
                "specialist": "Waskita Beton Precast",
                "phone": 0,
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "timestamp": "22-07-2024",
                "__collections__": {}
            },
            "foUmSWnudTtplYnxo9kR": {
                "phone": 0,
                "specialist": "TKDN",
                "alamat": "Ardjaka (Emir)",
                "status": "inisiasi",
                "nama": "Smart Lighting, Viana B2B",
                "timestamp": "19-06-2024",
                "__collections__": {}
            },
            "gP7JIXUBNSSJYAQGDThN": {
                "specialist": "Elnusa",
                "alamat": "ardjaka",
                "nama": "HSE Viana",
                "status": "kontrak",
                "phone": 159500000,
                "timestamp": "30-09-2024",
                "__collections__": {}
            },
            "gVUjmqL9njFRgDAmXd3R": {
                "nama": "VIANA HSE",
                "specialist": "PLN (Persero)",
                "phone": 0,
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "timestamp": "29-07-2024",
                "__collections__": {}
            },
            "hxje1zEYh8Y5lX22slqn": {
                "nama": "NTU WP 0",
                "specialist": "SCCIC ITB",
                "phone": 250000000,
                "alamat": "Siti Insani & Okyza",
                "status": "proposal",
                "timestamp": "23-12-2024",
                "__collections__": {}
            },
            "iHOoWVLhfUGV1h8BSJfW": {
                "nama": "Smart Building",
                "specialist": "IIP Summarecon",
                "status": "proposal",
                "alamat": "Siti Insani & Okyza",
                "timestamp": "31-12-2024",
                "phone": 850000000,
                "__collections__": {}
            },
            "jBZl7OmlbH0O8PMZLGp8": {
                "nama": "VIANA HSE",
                "specialist": "Unilever Indonesia, PT",
                "phone": 200000000,
                "alamat": "Ardjaka",
                "status": "proposal",
                "timestamp": "14-10-2024",
                "__collections__": {}
            },
            "jM9tp9hlHrhjphsQebPn": {
                "nama": "VIANA HSE",
                "specialist": "KIDECO",
                "phone": 0,
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "timestamp": "19-08-2024",
                "__collections__": {}
            },
            "kL0FJe7MlbZIOoNjkOjv": {
                "nama": "VIANA ",
                "specialist": "Enterprise Global Project, PT",
                "phone": 250000000,
                "alamat": "Ardjaka",
                "status": "proposal",
                "timestamp": "30-09-2024",
                "__collections__": {}
            },
            "l3PmxmuaWQSIMwyk9pEx": {
                "nama": "VIANA HSE",
                "specialist": "Rekayasa Engineering",
                "phone": 0,
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "timestamp": "22-07-2024",
                "__collections__": {}
            },
            "mmpZSrWyj3R5En71f2cg": {
                "nama": "VIANA",
                "specialist": "Amanin Inteligensia International",
                "phone": 0,
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "timestamp": "26-08-2024",
                "__collections__": {}
            },
            "mxgPrmhLDzU5luKhB9Vx": {
                "nama": "VIANA HSE",
                "specialist": "Baker Hughes",
                "phone": 0,
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "timestamp": "22-07-2024",
                "__collections__": {}
            },
            "rRVklreV0CP0yQ8BUi29": {
                "nama": "VIANA HSE",
                "specialist": "Jasamarga Jakarta Cikampek II Selatan",
                "phone": 150000000,
                "alamat": "ardjaka",
                "status": "inisiasi",
                "timestamp": "21-10-2024",
                "__collections__": {}
            },
            "usLR2OTCEpgqLczDXXhD": {
                "specialist": "PT. Kalimantan Prima Persada",
                "alamat": "Ardjaka",
                "nama": "VIANA Smart Ritase",
                "phone": 169150000,
                "status": "kontrak",
                "timestamp": "31-12-2024",
                "__collections__": {}
            },
            "vRdJ8knGGVTecDwDapFm": {
                "nama": "VIANA/INARA",
                "specialist": "Pertamina",
                "alamat": "Ardjaka",
                "phone": 250000000,
                "status": "proposal",
                "timestamp": "05-08-2024",
                "__collections__": {}
            },
            "vZRlLDlE4R0gKcuvvm77": {
                "nama": "Viana absensi",
                "specialist": "Brawijaya Clinic",
                "phone": 0,
                "alamat": "ardjaka",
                "status": "inisiasi",
                "timestamp": "12-08-2024",
                "__collections__": {}
            },
            "wF5hk5tcs8awdGWL0p4J": {
                "nama": "Face Recognition",
                "specialist": "Universitas Kristen Maranatha",
                "phone": 50000000,
                "alamat": "Sani",
                "status": "proposal",
                "timestamp": "23-09-2024",
                "__collections__": {}
            },
            "wacesLfeAPbaPqQJ3o55": {
                "nama": "VIANA",
                "specialist": "Waskita Karya",
                "phone": 0,
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "__collections__": {}
            },
            "woKmaXxikdBPu70oe7EH": {
                "nama": "Viana",
                "specialist": "Berca Hardayaperkasa, PT",
                "phone": 0,
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "__collections__": {}
            },
            "x3hB46p0kXOEtC3ujUln": {
                "nama": "VIANA Body Behavior ",
                "specialist": "KARLA Bionics",
                "phone": 0,
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "timestamp": "26-08-2024",
                "__collections__": {}
            },
            "ypy1bYKhuH5IlJVjxdis": {
                "nama": "VIANA/INARA, Smart Building",
                "specialist": "PT. Wijaya Karya",
                "phone": 0,
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "__collections__": {}
            },
            "ytW7HkhWbaeAlvtfxK2t": {
                "specialist": "KBB",
                "phone": 350000000,
                "status": "inisiasi",
                "timestamp": "07-10-2024",
                "nama": "Kajian e-govt 2025",
                "alamat": "Ardjaka",
                "__collections__": {}
            },
            "ziiVsYJvMVVq7nMnULu0": {
                "nama": "VIANA",
                "specialist": "Surya Semesta Internusa Tbk",
                "alamat": "Ardjaka",
                "status": "inisiasi",
                "timestamp": "12-08-2024",
                "phone": 0,
                "__collections__": {}
            }
        },
        "lci": {
            "4h3Cp1wZrUTrizz1YOSl": {
                "nama": "Maintenance & Servie",
                "specialist": "CAA",
                "phone": 0,
                "alamat": "Alda",
                "status": "inisiasi",
                "timestamp": "05-08-2024",
                "__collections__": {}
            },
            "5XXEl8SWT1sVaBO5ox0Q": {
                "nama": "Arvis (QHSE)",
                "specialist": "Autoplastik Indonesia",
                "alamat": "Alda",
                "status": "inisiasi",
                "timestamp": "29-07-2024",
                "phone": 150000000,
                "__collections__": {}
            },
            "5b0fr08srw4cwmt3s9Qw": {
                "nama": "Smart Home",
                "specialist": "Trusmi Land",
                "status": "inisiasi",
                "alamat": "alda/anton",
                "phone": 100000000,
                "timestamp": "19-08-2024",
                "__collections__": {}
            },
            "64lswZMPHtYyGVvS6TBb": {
                "nama": "Tripisia (maintenance&upgrade)",
                "specialist": "PT KAI",
                "alamat": "alda",
                "status": "kontrak",
                "phone": 180000000,
                "timestamp": "11-11-2024",
                "__collections__": {}
            },
            "6idTviIVxs1hG8wLSjVZ": {
                "nama": "Intrusion Prevention Detection",
                "specialist": "Nodeflux",
                "alamat": "Alda",
                "status": "inisiasi",
                "timestamp": "28-10-2024",
                "phone": 200000000,
                "__collections__": {}
            },
            "79rJDOj35W2g2uVnxAjK": {
                "nama": "AntrianQu",
                "specialist": "UNPAD",
                "phone": 38000000,
                "alamat": "alda",
                "status": "kontrak",
                "timestamp": "02-12-2024",
                "__collections__": {}
            },
            "BZpKaWorRH6jt47d18u3": {
                "nama": "Arvis (counting)",
                "specialist": "Kota Baru Parahyangan",
                "alamat": "alda",
                "status": "negosiasi",
                "phone": 150000000,
                "timestamp": "11-11-2024",
                "__collections__": {}
            },
            "ChOE29vAnLE85Ykffnsb": {
                "nama": "costumize apps",
                "phone": 50000000,
                "specialist": "Artistek (TTE Apps)",
                "alamat": "Alda",
                "status": "kontrak",
                "__collections__": {}
            },
            "Ev3M2XJZiP67W9uMijA1": {
                "nama": "SWB",
                "specialist": "Bersih Hijau Lestari",
                "phone": 0,
                "alamat": "Alda",
                "status": "inisiasi",
                "timestamp": "26-08-2024",
                "__collections__": {}
            },
            "FZcWGaw7DNnQGd9KeX7A": {
                "nama": "Smart Building",
                "specialist": "IIP",
                "phone": 250000000,
                "alamat": "Alda",
                "status": "proposal",
                "timestamp": "09-12-2024",
                "__collections__": {}
            },
            "MdUhS1238SzmxYjsn2iw": {
                "nama": "Arvis",
                "specialist": "RSHS",
                "alamat": "alda",
                "phone": 70000000,
                "status": "proposal",
                "timestamp": "05-12-2024",
                "__collections__": {}
            },
            "Me7wkDz8phOdxzvO3Pdy": {
                "nama": "software keamanan ",
                "specialist": "Kementrian Sektretaris Negara",
                "phone": 0,
                "alamat": "Alda",
                "status": "inisiasi",
                "timestamp": "18-11-2024",
                "__collections__": {}
            },
            "OomQfSpkb6tLVHV2QGfn": {
                "nama": "E-Akademik",
                "specialist": "Poltek PUPR",
                "alamat": "alda",
                "phone": 103000000,
                "timestamp": "29-07-2024",
                "status": "kontrak",
                "__collections__": {}
            },
            "V0H4goArgLA5EeN8es5a": {
                "nama": "Penguatan Innovasi",
                "specialist": "ITB (Bp Fahdil)",
                "alamat": "alda",
                "status": "kontrak",
                "phone": 30000000,
                "timestamp": "02-12-2024",
                "__collections__": {}
            },
            "WP24LVXgny6gnPwZm84Z": {
                "nama": "Arvis (counting)",
                "specialist": "Pratama Mitra Sejati",
                "phone": 0,
                "alamat": "Alda",
                "status": "inisiasi",
                "timestamp": "12-08-2024",
                "__collections__": {}
            },
            "XXwPYmfaeutaAiFQ1E4N": {
                "nama": "Smart Wastebin",
                "specialist": "Pemkot Madiun",
                "alamat": "alda",
                "status": "kontrak",
                "phone": 199000000,
                "timestamp": "24-12-2024",
                "__collections__": {}
            },
            "ZpHvYABl4U9litkyQd7D": {
                "nama": "costumize apps",
                "phone": 50000000,
                "specialist": "Artistek (Mojang Apps)",
                "alamat": "Alda",
                "status": "kontrak",
                "__collections__": {}
            },
            "aBZnRPh1MyiFDWHe1lq9": {
                "nama": "Air Quality Sensor",
                "phone": 225000000,
                "specialist": "City Sensing",
                "alamat": "Alda",
                "status": "proposal",
                "timestamp": "05-12-2024",
                "__collections__": {}
            },
            "cujOy2ZoAcmB3PiS2243": {
                "nama": "AntrianQu",
                "specialist": "BAPENDA Kab. Merauke",
                "phone": 170000000,
                "alamat": "Alda",
                "status": "proposal",
                "timestamp": "09-12-2024",
                "__collections__": {}
            },
            "dyRT99RBfhvwEulL0dMA": {
                "specialist": "IIP",
                "alamat": "alda",
                "status": "proposal",
                "nama": "Smart X - Simulator (Payment Simulator)",
                "phone": 840000000,
                "timestamp": "21-10-2024",
                "__collections__": {}
            },
            "mMfqGC3HGAFLjpiS1Jyk": {
                "nama": "Arvis (counting)",
                "specialist": "TELKOM",
                "phone": 200000000,
                "alamat": "Alda",
                "status": "proposal",
                "timestamp": "19-08-2024",
                "__collections__": {}
            },
            "om9pZ6Z8ILr7ZepcZRLE": {
                "nama": "AWS (upgrade)",
                "specialist": "Ditbun",
                "alamat": "Alda",
                "status": "kontrak",
                "timestamp": "11-11-2024",
                "phone": 190000000,
                "__collections__": {}
            },
            "pwdA52RYd63F4zOpbxV0": {
                "nama": "Arvis (QHSE)",
                "specialist": "Pepsico Indonesia",
                "alamat": "Alda",
                "status": "inisiasi",
                "timestamp": "29-07-2024",
                "phone": 150000000,
                "__collections__": {}
            },
            "qS4y8QXRyLb2Rn7ZpLw6": {
                "nama": "Smart Farming",
                "specialist": "RNI",
                "alamat": "alda",
                "status": "proposal",
                "timestamp": "22-07-2024",
                "phone": 200000000,
                "__collections__": {}
            },
            "sgoyoTd03wALPhIWod5M": {
                "nama": "SWB",
                "alamat": "alda",
                "specialist": "NTU WP-2",
                "phone": 211000000,
                "timestamp": "23-12-2024",
                "status": "negosiasi",
                "__collections__": {}
            },
            "w1PXJFDPPIchu3EQN3Pl": {
                "nama": "Prototype Smart Building",
                "specialist": "Urbansolve",
                "phone": 33000000,
                "alamat": "alda",
                "status": "kontrak",
                "timestamp": "24-12-2024",
                "__collections__": {}
            }
        },
        "msp": {
            "0zwKm2MMMIx6XqEYNgrT": {
                "nama": "Aset Management",
                "specialist": "Citavis",
                "phone": 250000000,
                "alamat": "fahri",
                "status": "inisiasi",
                "timestamp": "03-02-2025",
                "__collections__": {}
            },
            "1cWOdPqKOCVzR49rTHLu": {
                "specialist": "SCCIC",
                "alamat": "Fahri",
                "status": "proposal",
                "nama": "Smart X Simulator (smart building-kenyamanan ruang)",
                "phone": 650000000,
                "timestamp": "09-12-2024",
                "__collections__": {}
            },
            "3Hlysjkm36sud05amXH3": {
                "specialist": "Disperindag",
                "alamat": "haqi",
                "status": "inisiasi",
                "nama": "Kajian relokasi industri",
                "phone": 100000000,
                "timestamp": "20-11-2024",
                "__collections__": {}
            },
            "4Y5a74ofVJ9gNlbx8B1N": {
                "specialist": "SCCIC",
                "alamat": "Robby",
                "status": "kontrak",
                "nama": "EO Blankspot",
                "phone": 22367250,
                "timestamp": "24-12-2024",
                "__collections__": {}
            },
            "8cNLasx9VKrG7zKEo4B8": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "8mtb4hlQlefXkCx02rWp": {
                "specialist": "DLH Garut ",
                "alamat": "haqi",
                "nama": "Platform WebGis untuk Visualisasi RTH",
                "phone": 100000000,
                "status": "proposal",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "9eT50cI6dSEvEZVlWKj5": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "D22277oB1UJLfQKQQU96": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "DLfPbQ0IxMEQmm9rmXjE": {
                "specialist": "SCCIC",
                "phone": 10000000,
                "alamat": "Haqi",
                "nama": "FGD UMKM 20 Des",
                "status": "kontrak",
                "timestamp": "08-01-2025",
                "__collections__": {}
            },
            "EJpYdzwhhyjeNBNTdHoU": {
                "nama": "Kajian Smart Station",
                "alamat": "Fakhri",
                "status": "kontrak",
                "phone": 398700900,
                "specialist": "KCI ",
                "timestamp": "11-11-2024",
                "__collections__": {}
            },
            "IFQ1c6v2FmfTk8RzylZB": {
                "specialist": "Dinas BKPSDM Kabupaten Kuningan ",
                "alamat": "haqi",
                "status": "inisiasi",
                "nama": "Modul Training",
                "timestamp": "23-12-2024",
                "phone": 35000000,
                "__collections__": {}
            },
            "ITgWJQcLsEYEXlrkBHJP": {
                "specialist": "Dishub Kota Bandung",
                "alamat": "Haqi",
                "status": "inisiasi",
                "nama": "Simderek Android & IoS",
                "timestamp": "20-11-2024",
                "phone": 90000000,
                "__collections__": {}
            },
            "IvJFpzlTLSXBRBBbXAok": {
                "nama": "Pembuatan DED untuk BAS di Stasiun BNI City",
                "specialist": "KCI ",
                "phone": 350000000,
                "alamat": "fahri",
                "status": "inisiasi",
                "timestamp": "23-12-2024",
                "__collections__": {}
            },
            "MUQt5V6hWtiZdIwX6QTb": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "Nkz9Ewn6MsrQO9EZkHLZ": {
                "alamat": "Haqi",
                "specialist": "BKPSDM Indramayu",
                "status": "kontrak",
                "phone": 39375000,
                "nama": "Modul Training",
                "timestamp": "23-12-2024",
                "__collections__": {}
            },
            "PbDxk8gVsCetw833Q3ws": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "RO8cuEAyA1X55QO0qkvK": {
                "nama": "NTU Sensor ",
                "phone": 175071108,
                "alamat": "Fahri",
                "status": "kontrak",
                "timestamp": "18-11-2024",
                "specialist": "SCCIC ",
                "__collections__": {}
            },
            "S5eJ3GGn87PHomgLM0Cl": {
                "nama": "VAIA VISITOR",
                "specialist": "BATIK TRUSMI CIREBON",
                "phone": 12500000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "02-12-2024",
                "__collections__": {}
            },
            "StEeMbh3P0jIQ6iisVFK": {
                "nama": "Event Business Competition",
                "specialist": "ICESCO",
                "alamat": "Haqi",
                "phone": 195000000,
                "status": "negosiasi",
                "timestamp": "11-11-2024",
                "__collections__": {}
            },
            "UGmZyJLJqWtg3pXnez3e": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "UddHt4zHjZGkHeJbiGD7": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "WLaInxmUoDUWTW4Rwf5U": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "WmjpwxlYbc3GCDPsRw4c": {
                "specialist": "SCCIC",
                "phone": 2000000,
                "alamat": "Haqi",
                "status": "kontrak",
                "timestamp": "18-11-2024",
                "nama": "EO Workshop ADB",
                "__collections__": {}
            },
            "XLsYMdzRxuLcgHXBLudD": {
                "nama": "NTU Platform Water ",
                "specialist": "SCCIC",
                "alamat": "Fahri",
                "phone": 267510000,
                "status": "inisiasi",
                "timestamp": "23-12-2024",
                "__collections__": {}
            },
            "Xlh8RFAtY2sw43S7bhKt": {
                "specialist": "SCCIC",
                "nama": "Seminar Silver MICE",
                "alamat": "Haqi",
                "phone": 30697917,
                "status": "kontrak",
                "timestamp": "08-01-2025",
                "__collections__": {}
            },
            "Y1Dw9oa791TeyC1LwQ8j": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "ZJi1cianJT9f3WOqvn9G": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "bKvCRARmclbYvyrhtlGw": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "cfysXnvqPpbqTIvouxZJ": {
                "alamat": "Valdi",
                "status": "proposal",
                "specialist": "IIP",
                "nama": "Smart Building IIP (Water)",
                "timestamp": "25-11-2024",
                "phone": 500000000,
                "__collections__": {}
            },
            "dnctrRTrhW9YVy3V3Wb5": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "dzolV7WqteFdMZrrTGQL": {
                "nama": "Sustainable & Smart Residensial",
                "specialist": "PT Infrahomeproperty",
                "phone": 70000000,
                "alamat": "fahri",
                "status": "kontrak",
                "timestamp": "03-02-2025",
                "__collections__": {}
            },
            "i8j7KelTNzLo8P9mTzw2": {
                "nama": "Kajian RPIK",
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "27-09-2024",
                "specialist": "Dinas UMKM Kuningan",
                "phone": 100000000,
                "__collections__": {}
            },
            "kE8EzEQIoP0EhKFGgNjW": {
                "nama": "Modul BKPSDM Indramayu",
                "specialist": "BKPSDM Indramayu",
                "phone": 175000000,
                "alamat": "haqi",
                "status": "inisiasi",
                "timestamp": "23-12-2024",
                "__collections__": {}
            },
            "lyyWXi5aShBz686C3Bu7": {
                "phone": 80000000,
                "specialist": "Yandex",
                "alamat": "Robby",
                "status": "kontrak",
                "nama": "EO Seminar Internasional",
                "timestamp": "18-11-2024",
                "__collections__": {}
            },
            "oRdOttfvkrUJ5iHRNiv7": {
                "nama": "Disaster Risk Apps",
                "specialist": "Pak baskara",
                "alamat": "Haqi",
                "phone": 9900000,
                "status": "kontrak",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "qtHkrZhjznYySBnEstGk": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "rktStMS2GOZJlrvtpi8t": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "rrQ5yqll7uF4qFL20niu": {
                "nama": "Platform data analitik - Gen AI ",
                "specialist": "Disperindag",
                "phone": 0,
                "alamat": "haqi",
                "status": "inisiasi",
                "timestamp": "04-11-2024",
                "__collections__": {}
            },
            "s9dOFW8cFySz6SptCzem": {
                "nama": "Jasa Outsourching Kajian Bakti",
                "specialist": "SCCIC",
                "phone": 7000000,
                "alamat": "Haqi",
                "status": "kontrak",
                "timestamp": "11-11-2024",
                "__collections__": {}
            },
            "ubzzAlCta1f6hhfn9uzd": {
                "alamat": "Nuri",
                "phone": 90000000,
                "status": "kontrak",
                "nama": "EO Seminar Internasional",
                "timestamp": "18-11-2024",
                "specialist": "SCCIC ICISS",
                "__collections__": {}
            },
            "v3nCaOjaQhmWwrl0RSxW": {
                "specialist": "SCCIC",
                "alamat": "Haqi",
                "status": "kontrak",
                "nama": "Event FGD & Survei Bakti",
                "phone": 25000000,
                "timestamp": "16-12-2024",
                "__collections__": {}
            },
            "vbVfm3kH02ziHysorCN6": {
                "nama": "SSO Data Kepegawaian",
                "specialist": "BKSDM Indramayu",
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "20-11-2024",
                "phone": 150000000,
                "__collections__": {}
            },
            "vn7AqfApZt9m5kVsQndq": {
                "nama": "Kajian Smart Residential ",
                "specialist": "PT ARS",
                "phone": 70000000,
                "alamat": "Fahri",
                "status": "kontrak",
                "timestamp": "08-01-2025",
                "__collections__": {}
            },
            "wAslb6j5IfsjnrSVcAUm": {
                "specialist": "SCCIC",
                "phone": 10000000,
                "alamat": "Haqi",
                "nama": "FGD UMKM 9 Des",
                "status": "kontrak",
                "timestamp": "08-01-2025",
                "__collections__": {}
            },
            "yjIKrsDxpEVpNDsTdmVh": {
                "nama": "Web Water Platform",
                "specialist": "Dumai Tirta Persada",
                "phone": 200000000,
                "alamat": "Fahri",
                "status": "inisiasi",
                "timestamp": "02-12-2024",
                "__collections__": {}
            },
            "zC9l1ddNtXPsDpBB24bL": {
                "nama": "Disaster risk Management",
                "specialist": "KMMB",
                "phone": 300000,
                "alamat": "Haqi",
                "status": "inisiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            }
        },
        "sccic": {
            "1AglcoKRCELcQcaJj77b": {
                "alamat": "Donna",
                "nama": "Konsultasi Perorangan Swakelola type I",
                "phone": 200000000,
                "specialist": "KOMINFO (Bpk. Ismail)",
                "status": "inisiasi",
                "timestamp": "17-02-2025",
                "__collections__": {}
            },
            "53nFwD1ddDUuou9drbz4": {
                "nama": "Smart Campus",
                "specialist": "POLTEK ATK",
                "phone": 1000000000,
                "alamat": "Donna",
                "timestamp": "08-07-2024",
                "status": "proposal",
                "__collections__": {}
            },
            "C4Q2Z7Y5XLi2V9SN3dtB": {
                "nama": "Sistem Manajemen By Objektif",
                "specialist": "Pemkab Bogor",
                "phone": 450000000,
                "alamat": "Sandhi",
                "status": "negosiasi",
                "timestamp": "03-02-2025",
                "__collections__": {}
            },
            "CWCDH2zZ0kc6OPzGkppS": {
                "specialist": "KKIP",
                "alamat": "Donna",
                "nama": "Pengembangan dan Implementasi Sistem Data Internal KKIP",
                "status": "negosiasi",
                "phone": 2000000000,
                "timestamp": "03-02-2025",
                "__collections__": {}
            },
            "CbgyMl1BFGQDHg5n3mrU": {
                "nama": "Master Plan Smart City",
                "specialist": "DISKOMINFO KOTA CIREBON",
                "alamat": "Anton",
                "phone": 250000000,
                "status": "negosiasi",
                "timestamp": "03-02-2025",
                "__collections__": {}
            },
            "DGcEh0fJGzOnwyPJgGgm": {
                "specialist": "Dishub Prov Jabar",
                "alamat": "Donna",
                "nama": "Maintenance & Update Monita Dishub Prov Jabar",
                "phone": 200000000,
                "status": "negosiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "IZuficVc9DvveMfP3P89": {
                "nama": "SMART CITY PROVINSI BANTEN",
                "specialist": "BAPPEDA PROVINSI BANTEN",
                "phone": 0,
                "alamat": "Anton Arifin",
                "status": "inisiasi",
                "timestamp": "11-11-2024",
                "__collections__": {}
            },
            "L82EAMvaS39e5wpnbmK1": {
                "phone": 1300000000,
                "specialist": "Dishub Prov Banten",
                "alamat": "Donna",
                "nama": "Viana dan Monita Provinsi Banten RKA 2025",
                "status": "inisiasi",
                "timestamp": "16-12-2024",
                "__collections__": {}
            },
            "MJY2pGR34Q3FIO60guH3": {
                "nama": "Kajian lanjutan BGC",
                "specialist": "KEMEN PUPR",
                "phone": 1000000000,
                "alamat": "Donna",
                "status": "inisiasi",
                "timestamp": "11-11-2024",
                "__collections__": {}
            },
            "MRTsVYt0RB6PmXRc5gRz": {
                "nama": "Master Plan Smart City",
                "specialist": "DISKOMINFO Kota Bandung",
                "phone": 250000000,
                "alamat": "Anton",
                "status": "inisiasi",
                "timestamp": "31-01-2025",
                "__collections__": {}
            },
            "Md1i083siv3rK8dn71Ok": {
                "nama": "LITERASI DIGITAL 2025 DPD JAWA BARAT",
                "specialist": "DEWAN PERWAKILAN DAERAH JAWA BARAT",
                "phone": 0,
                "alamat": "Anton Arifin",
                "status": "inisiasi",
                "timestamp": "11-11-2024",
                "__collections__": {}
            },
            "MpJBrfyJ8O6uitAkYrgo": {
                "nama": "Reliability Analysis",
                "phone": 400000000,
                "specialist": "KAI Direktorat Prasarana/Business",
                "alamat": "Donna",
                "status": "inisiasi",
                "__collections__": {}
            },
            "NEyIn5APysU3VrZIG6yc": {
                "nama": "Smart Building",
                "specialist": "RS JIH Purwokerto",
                "phone": 0,
                "alamat": "Donna",
                "status": "inisiasi",
                "__collections__": {}
            },
            "OrYBRgt04zYI4WKHL6YA": {
                "nama": "PENGEMBANGAN INFRASTRUKTUR TIK",
                "specialist": "DISKOMINFO KOTA BANDUNG",
                "phone": 0,
                "alamat": "Anton Arifin",
                "status": "inisiasi",
                "timestamp": "11-11-2024",
                "__collections__": {}
            },
            "OtIIRz4qRM5qqhXix9D9": {
                "nama": "Ocean Big Data",
                "phone": 700000000,
                "specialist": "KKP",
                "alamat": "Donna",
                "status": "inisiasi",
                "__collections__": {}
            },
            "Pz25XNAy84YdMlYkG2Wb": {
                "nama": "Roadmap pengembangan ekosistim digital",
                "specialist": "KOMINFO (Bpk Aries)",
                "phone": 500000000,
                "alamat": "Sandhi",
                "status": "proposal",
                "timestamp": "07-10-2024",
                "__collections__": {}
            },
            "QSCSEl0uApTIJQWFzcwk": {
                "nama": "SmartCity Kominfo",
                "phone": 1000000000,
                "specialist": "Ditjen Aptika KOMINFO",
                "alamat": "Donna",
                "status": "proposal",
                "__collections__": {}
            },
            "TH7YEUyrV7AQlwAhBVo3": {
                "nama": "VIANA 200 titik",
                "phone": 2400000000,
                "specialist": "Kemen Perhubungan",
                "alamat": "Donna",
                "status": "negosiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "V0GGvhLJdkzM1XHdZS87": {
                "nama": "Review Smart City ",
                "specialist": "Kota Depok",
                "phone": 100000000,
                "alamat": "Anton Arifin",
                "status": "proposal",
                "timestamp": "11-11-2024",
                "__collections__": {}
            },
            "VIIbJ4ZzIinzSbmuWB2i": {
                "nama": "Sistem Data Angkatan",
                "phone": 1700000000,
                "alamat": "Donna",
                "status": "proposal",
                "timestamp": "09-12-2024",
                "specialist": "POTHAN KEMENHAN",
                "__collections__": {}
            },
            "by3Ea9PQz82eqVnD1s8Z": {
                "nama": "TO BE ARSITEKTUR SPBE DISKOMINFO ",
                "specialist": "KOTA CIREBON",
                "phone": 0,
                "alamat": "Anton Arifin",
                "status": "inisiasi",
                "timestamp": "11-11-2024",
                "__collections__": {}
            },
            "fVnnh6EZkOjKmx3WDtgp": {
                "nama": "Smart Maritime Smart Rural dan Aplikasi AI berbasis Satelit",
                "specialist": "Telkomsat",
                "phone": 0,
                "alamat": "Anton Arifin",
                "status": "inisiasi",
                "timestamp": "11-11-2024",
                "__collections__": {}
            },
            "fi3j2MzFxrR3J7JMSaS9": {
                "nama": "Kelanjutan SPBE 3T",
                "specialist": "BAKTI KOMIDIGI",
                "phone": 3504100000,
                "alamat": "Sandhi",
                "status": "proposal",
                "timestamp": "20-01-2025",
                "__collections__": {}
            },
            "gyGb6xaqZAdXyCuCkFsE": {
                "nama": "RTDI dan RKCI 2025",
                "specialist": "BAKTI KOMIDIGI",
                "phone": 2000000000,
                "alamat": "Sandhi",
                "status": "proposal",
                "timestamp": "20-01-2025",
                "__collections__": {}
            },
            "hcED75ox7gIaR7Lvzteo": {
                "nama": "Smart Building",
                "specialist": "Bali International Hospital",
                "phone": 0,
                "alamat": "Donna",
                "status": "inisiasi",
                "__collections__": {}
            },
            "i2XZGMK1dgPB3uPyXIyY": {
                "specialist": "Dishub Prov Yogyakarta",
                "alamat": "Donna",
                "nama": "Viana 4 ruas x 3 wilayah RKA 2025",
                "status": "kontrak",
                "timestamp": "10-02-2025",
                "phone": 97500000,
                "__collections__": {}
            },
            "j6uLnHQx8NBhfzswCEPf": {
                "nama": "Pengembangan SKPJ Swakelola type I",
                "specialist": "BMPR",
                "phone": 200000000,
                "alamat": "Fadhil",
                "status": "inisiasi",
                "timestamp": "17-02-2025",
                "__collections__": {}
            },
            "lCMY8zmtoZNhnDJ3gaXO": {
                "nama": "Studi Review Bisnis Data Center",
                "specialist": "ICON+",
                "alamat": "Fadhil",
                "phone": 689920200,
                "status": "inisiasi",
                "timestamp": "16-12-2024",
                "__collections__": {}
            },
            "m9bqqkk06KaB3AHy4PLM": {
                "nama": "Master Plan Smart City",
                "specialist": "DISKOMINFO Kab Kuningan",
                "phone": 250000000,
                "alamat": "Anton",
                "status": "inisiasi",
                "timestamp": "31-01-2025",
                "__collections__": {}
            },
            "nycIZI1ZC69VegQJZwxA": {
                "nama": "Kajian Skema Single Billing ",
                "specialist": "ICONNET",
                "phone": 170000000,
                "alamat": "Donna",
                "status": "negosiasi",
                "timestamp": "17-02-2025",
                "__collections__": {}
            },
            "pjp4tgFGY1ngt0vLmMWu": {
                "nama": "Building Information Modelling",
                "specialist": "KEMEN PUPR",
                "phone": 1000000000,
                "alamat": "Fadhil",
                "status": "inisiasi",
                "timestamp": "03-02-2025",
                "__collections__": {}
            },
            "qD56Ljr6WU7IA11St0sL": {
                "nama": "Potensi Kajian Pengukuran BGH",
                "specialist": "KEMEN PUPR",
                "phone": 1600000000,
                "alamat": "Donna",
                "status": "negosiasi",
                "timestamp": "20-01-2025",
                "__collections__": {}
            },
            "rBaPucuuGKAR2JochlGc": {
                "nama": "Penyusunan masterplan dan transformasi digital Kab. Padang Sidempuan",
                "phone": 400000000,
                "specialist": "Diskominfo Kab. Padang Sidempuan",
                "alamat": "Donna",
                "status": "inisiasi",
                "__collections__": {}
            },
            "s6YERlVysGXgvoAnWrb2": {
                "nama": "Master Plan Smart City",
                "specialist": "DISKOMINFO Kab Indramayu",
                "alamat": "Anton",
                "status": "inisiasi",
                "timestamp": "31-01-2025",
                "phone": 250000000,
                "__collections__": {}
            },
            "uF4UeW32HWAiGu0rOPTq": {
                "nama": "Smarcity (Kajian)",
                "phone": 400000000,
                "specialist": "Diskominfo Kab. Gunungsitoli",
                "alamat": "Donna",
                "status": "inisiasi",
                "__collections__": {}
            },
            "vTb3s4UbNG0JOwL2aU2R": {
                "nama": "Master Plan Smart City",
                "specialist": "DISKOMINFO Kota Cimahi",
                "phone": 250000000,
                "alamat": "Anton",
                "status": "inisiasi",
                "timestamp": "31-01-2025",
                "__collections__": {}
            },
            "w3qLbHdO5bT6xyLsvFuM": {
                "nama": "Smart Living Lab Maritime utk Pemberdayaan Masyarakat Pesisir Guna Meningkatkan Kesejahteraan Keberlanjutan",
                "specialist": "TELKOMSEL",
                "alamat": "Donna",
                "phone": 400000000,
                "status": "negosiasi",
                "timestamp": "15-01-2025",
                "__collections__": {}
            },
            "x0lofeHjEhcWWIN0TWSR": {
                "nama": "Review Bisnis Fiber Optic Kota Mandiri",
                "specialist": "Summarecon",
                "phone": 500000000,
                "alamat": "Donna",
                "status": "proposal",
                "timestamp": "05-08-2024",
                "__collections__": {}
            },
            "yDKxTYeddQaOBvZq8fgE": {
                "nama": "Kajian Smart City",
                "specialist": "Diskominfo Tangerang Selatan",
                "phone": 0,
                "alamat": "Anton Arifin",
                "status": "inisiasi",
                "timestamp": "11-11-2024",
                "__collections__": {}
            }
        }
    }

# Function to convert date string to desired format
def convert_to_datetime_format(date_str, input_format="%d-%m-%Y", output_format="%Y-%m-%d %H:%M:%S"):
    print(date_str)
    if date_str is None:
        return ""
    try:
        # Parse the input date string
        date_obj = datetime.strptime(date_str, input_format)
        # Format it to the desired output format
        print(date_obj.strftime(output_format))
        return date_obj.strftime(output_format)

    except ValueError:
        return None

# Transpose, normalize, and remap
normalized_data = []
for collection_id, nested_objects in data.items():
    for obj_id, obj_data in nested_objects.items():
        # Remap keys
        remapped_data = {
            "partner": obj_data.get("specialist"),
            "pic": obj_data.get("alamat"),
            "name": obj_data.get("nama"),
            "value": obj_data.get("phone"),
            "status": obj_data.get("status"),
            "updated_at": convert_to_datetime_format(obj_data.get("timestamp")),
            # "id": obj_id,
            "organization": collection_id
        }
        # Drop the __collections__ key (not included in remapped_data)
        normalized_data.append(remapped_data)

# Save the result to a file
output_file = "remapped_data.json"
with open(output_file, "w") as file:
    json.dump(normalized_data, file, indent=4)

print(f"Remapped data has been saved to {output_file}")