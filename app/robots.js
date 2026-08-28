import { siteConfig } from "@/lib/config";
export default function robots(){return {rules:[{userAgent:"*",allow:"/",disallow:["/admin/","/api/admin/"]}],sitemap:`${siteConfig.url}/sitemap.xml`}}
