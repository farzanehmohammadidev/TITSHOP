import fs from "fs";
import path from "path";

const rootDir = "./app"; // مسیر اصلی پروژه‌ات

function processFile(filePath) {
  let code = fs.readFileSync(filePath, "utf8");

  // حذف any و جایگزینی با unknown
  code = code.replace(/:\s*any/g, ": unknown");

  // حذف متغیرهای تعریف شده اما استفاده نشده
  code = code.replace(/const\s+\w+\s*=\s*[^;]+;\s*\n(?=.*\b\1\b)/g, "");

  // جایگزینی <a> با <Link>
  code = code.replace(/<a\s+href="([^"]+)"[^>]*>(.*?)<\/a>/g, '<Link href="$1">$2</Link>\n');

  // اطمینان از import شدن Link
  if (code.includes("<Link") && !code.includes("from \"next/link\"")) {
    code = `import Link from "next/link";\n${code}`;
  }

  // حذف importهای بلااستفاده از mongoose و react
  code = code.replace(/import\s+mongoose[^;]+;\s*\n/g, "");
  code = code.replace(/import\s+\{\s*useState\s*,?\s*useEffect?\s*\}\s*from\s+"react";?\s*\n/g, "");

  fs.writeFileSync(filePath, code, "utf8");
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) walk(fullPath);
    else if (file.endsWith(".ts") || file.endsWith(".tsx")) processFile(fullPath);
  }
}

walk(rootDir);
console.log("✅ پروژه با موفقیت تمیز شد!");
