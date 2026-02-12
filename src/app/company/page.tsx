"use client";

import Image from "next/image";

const companyInfo = [
  { label: "会社名", value: "株式会社SCPP" },
  { label: "設立日", value: "2011年11月17日" },
  { label: "代表取締役", value: "植田 雄輝" },
  { label: "取締役", value: "平山 敬博" },
  { label: "資本金", value: "50,000,000円" },
  { label: "住所", value: "東京都港区赤坂1-12-32 アークヒルズ 森ビル12F" },
  { label: "従業員数", value: "48名" },
];

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* ── メインビジュアル ── */}
      <section className="relative w-full h-[180px] md:h-[280px] overflow-hidden">
        <Image
          src="/company/mv.jpg"
          alt="BioVault"
          fill
          className="object-cover scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p
            className="text-[var(--secondary-text)] text-[11px] md:text-sm tracking-[0.3em] uppercase mb-2"
            style={{ fontWeight: 400 }}
          >
            COMPANY
          </p>
          <h1
            className="text-white text-[28px] md:text-5xl tracking-[0.15em]"
            style={{ fontWeight: 900 }}
          >
            会社案内
          </h1>
          <div className="mt-4 w-12 h-[2px] bg-[#B88F3A]" />
        </div>
      </section>

      <div className="max-w-[960px] mx-auto px-4 py-6 md:py-10">

        {/* ── 会社概要 ── */}
        <section className="mb-14 md:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-8 bg-[#B88F3A] rounded-full" />
            <h2
              className="text-white text-xl md:text-3xl"
              style={{ fontWeight: 900 }}
            >
              会社概要
            </h2>
          </div>

          <div className="bg-[var(--card-bg)] overflow-hidden border border-[var(--border-color)]">
            <table className="w-full text-left">
              <tbody>
                {companyInfo.map((item, i) => (
                  <tr
                    key={item.label}
                    className={
                      i < companyInfo.length - 1
                        ? "border-b border-[var(--border-color)]"
                        : ""
                    }
                  >
                    <th
                      className="py-4 px-4 md:px-6 text-[#B88F3A] text-xs md:text-sm whitespace-nowrap align-top bg-[rgba(184,143,58,0.05)]"
                      style={{ fontWeight: 700, width: "130px" }}
                    >
                      {item.label}
                    </th>
                    <td className="py-4 px-4 md:px-6 text-white text-sm md:text-base">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            {/* 会社イメージ写真：PC / スマホ切替 */}
            <div className="w-full overflow-hidden mt-5 mb-5">
            {/* PC用 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/company/company.jpg"
              alt="株式会社SCPP"
              className="hidden md:block w-full h-auto"
            />
            {/* スマホ用 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/company/company_sp.jpg"
              alt="株式会社SCPP"
              className="block md:hidden w-full h-auto"
            />
          </div>
        </section>

        {/* ── オフィス ── */}
        <section className="mb-14 md:mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-1 h-8 bg-[#B88F3A] rounded-full" />
            <h2
              className="text-white text-xl md:text-3xl"
              style={{ fontWeight: 900 }}
            >
              オフィス
            </h2>
          </div>

          <p className="text-white text-sm md:text-base mb-5">
            〒107-6012　東京都港区赤坂1-12-32 アークヒルズ 森ビル12F
          </p>

          {/* Google Maps */}
          <div className="w-full aspect-[16/9] md:aspect-[2/1] overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E8%B5%A4%E5%9D%821-12-32+%E3%82%A2%E3%83%BC%E3%82%AF%E3%83%92%E3%83%AB%E3%82%BA%E6%A3%AE%E3%83%93%E3%83%AB&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="アークヒルズ 森ビル"
            />
          </div>
        </section>

      </div>

    </div>
  );
}
