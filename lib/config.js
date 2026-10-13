export const siteConfig = {
  name: "Viago",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999",
  phone: process.env.NEXT_PUBLIC_PHONE || "+91 75588 64420",
  email: process.env.NEXT_PUBLIC_EMAIL || "tripsviago@gmail.com",
  address: process.env.NEXT_PUBLIC_OFFICE_ADDRESS || "TC 58/3079, MELEPUTHEN VEEDU, PARAVILA, PACHALLOOR, KERALA 695027",
};

export function whatsappUrl(message) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}