/**
 * NFC Profile Card Configuration
 * ข้อมูลส่วนตัวสำหรับ Sisamane Dimak ( Menh ) / ສີສະໝານ ດີມາກ ( ເໝັ້ນ )
 */

const PROFILE_CONFIG = {
    // ข้อมูลทั่วไป (General Information)
    name: "Sisamane Dimak ( Menh )",
    laoName: "ສີສະໝານ ດີມາກ ( ເໝັ້ນ )",
    title: "OLDDOG ໝາເຖົ້າ",
    badge: "Verified Creator",
    status: {
        online: true,
        text: "Available for Contact & Collaboration"
    },
    bio: "OLDDOG ໝາເຖົ້າ | Tap my NFC card to save contact & connect instantly!",
    location: "Vientiane Laos",
    phone: "+856 20 77527911",
    avatar: "assets/avatar.jpg",

    // ข้อมูลสำหรับบันทึกผู้ติดต่อ (vCard Contact Info)
    vcard: {
        firstName: "Sisamane (Menh)",
        lastName: "Dimak",
        organization: "OLDDOG ໝາເຖົ້າ",
        title: "OLDDOG ໝາເຖົ້າ",
        phone: "+8562077527911",
        email: "",
        website: "https://instagram.com/mhen.me",
        address: "Vientiane, Laos",
        note: "Met via NFC Smart Profile Card"
    },

    // ปุ่มสกัดด่วนบน Hero Header (Hero Actions)
    heroActions: [
        { id: "vcard", label: "Add Contact", icon: "user-plus", primary: true },
        { id: "qr", label: "Share QR", icon: "qr-code", primary: false }
    ],

    // ทักษะและความเชี่ยวชาญ (Skills & Expertise)
    skills: [
        { name: "OLDDOG ໝາເຖົ້າ", level: "Master", icon: "sparkles" },
        { name: "Product Design", level: "Expert", icon: "layout" },
        { name: "Creative Direction", level: "Pro", icon: "layers" },
        { name: "Tech Innovation", level: "Advanced", icon: "code" }
    ],

    // ความสนใจส่วนตัว (Interests)
    interests: ["🐕 OLDDOG ໝາເຖົ້າ", "🇱🇦 Vientiane Laos", "🎵 Music & Sound", "☕ Coffee", "🚀 Innovation"],

    // ช่องทางโซเชียลมีเดีย (Social Links Hub with Custom Official Logo Icons)
    socials: [
        {
            platform: "Facebook",
            handle: "Sisamane Dimak",
            url: "https://www.facebook.com/share/1GFW14AfVF/",
            imageIcon: "assets/icon-facebook.png",
            color: "#1877F2",
            gradient: "transparent"
        },
        {
            platform: "Instagram",
            handle: "mhen.me",
            url: "https://instagram.com/mhen.me",
            imageIcon: "assets/icon-instagram.png",
            color: "#E1306C",
            gradient: "transparent"
        },
        {
            platform: "YouTube",
            handle: "@menhdimark",
            url: "https://youtube.com/@menhdimark?si=ZLVNlzGmlGkoluRw",
            imageIcon: "assets/icon-youtube.png",
            color: "#FF0000",
            gradient: "transparent"
        },
        {
            platform: "LinkedIn",
            handle: "Menh Dimark",
            url: "https://www.linkedin.com/in/menh-dimark-babbb0352?utm_source=share_via&utm_content=profile&utm_medium=member_android",
            imageIcon: "assets/icon-linkedin.png",
            color: "#0A66C2",
            gradient: "transparent"
        },
        {
            platform: "WhatsApp",
            handle: "+856 20 77527911",
            url: "https://wa.me/qr/EY53TK2HNGI3K1",
            icon: "whatsapp",
            color: "#25D366",
            gradient: "linear-gradient(135deg, #25D366, #128C7E)"
        },
        {
            platform: "Telegram",
            handle: "t.me/menhdimark",
            url: "https://t.me/menhdimark",
            icon: "telegram",
            color: "#0088cc",
            gradient: "linear-gradient(135deg, #0088cc, #005580)"
        },
        {
            platform: "SoundCloud",
            handle: "OLDDOG SoundCloud",
            url: "https://on.soundcloud.com/rhfrq12eAdtLU0tmfi",
            icon: "soundcloud",
            color: "#FF5500",
            gradient: "linear-gradient(135deg, #FF5500, #FF2200)"
        }
    ]
};
