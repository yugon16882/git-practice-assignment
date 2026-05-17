import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import Footer from '@/components/Footer';
import InteractiveDealSection from '@/components/InteractiveDealSection';
import ServerDealCard from '@/components/ServerDealCard';
import { prepareInitialDeals, LiteDeal } from '@/lib/dealUtils';
import { Trophy, CreditCard, Award, Gift, FolderOpen, ClipboardList, ArrowRight } from 'lucide-react';

// ISR: ホームページも1時間ごとに再生成（データ鮮度とCPU負荷のバランス）
export const revalidate = 720;

/**
 * サーバーサイドで初期30件のDealデータを準備
 * これにより、クライアントでの1.77MB JSONフェッチが不要になり、LCPが劇的に改善
 */
function getInitialDeals() {
  try {
    const filePath = path.join(process.cwd(), 'public/api/final_deals_lite.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const liteDeals: LiteDeal[] = JSON.parse(raw);
    return {
      deals: prepareInitialDeals(liteDeals, 30),
      totalCount: liteDeals.length
    };
  } catch (error) {
    console.error('Failed to load initial deals:', error);
    return { deals: [], totalCount: 0 };
  }
}

export default function HomePage() {
  // サーバー側でデータを準備（クライアントfetch不要）
  const { deals: initialDeals, totalCount } = getInitialDeals();

  return (
    <>
      <div className="min-h-screen bg-[var(--background)]">
        {/* Header */}
        <header className="bg-[var(--primary)] text-white py-8 md:py-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-gray-49"></div>
          <div className="max-w-6xl mx-auto px-4 relative z-10 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">
              PointChecker
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl">
              日本最大のポイントサイト案件比較エンジン。<br />
              <span className="font-bold text-white decoration-[var(--success)] underline decoration-4 underline-offset-4">最高還元額</span>をリアルタイムで検知します。
            </p>
          </div>
        </header>

        {/* ===== Featured Zone: Sophisticated Gradient and Blue Shadows ===== */}
        <div className="bg-gradient-to-b from-[var(--primary-light)]/30 via-[var(--background)] to-[var(--background)] pb-20">
          <div className="max-w-6xl mx-auto px-4 pt-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-10 flex items-center gap-3 tracking-tight">
                <Trophy size={32} strokeWidth={2.5} className="text-[var(--primary)]" />
                Featured Comparisons
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Link
                  href="/directory/credit-card"
                  className="group bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <CreditCard size={120} />
                  </div>
                  <CreditCard size={36} strokeWidth={2.5} className="text-[var(--primary)] mb-6" />
                  <div className="text-2xl font-bold text-gray-900 mb-2 leading-tight">クレジットカード<br />還元額ランキング</div>
                  <div className="text-gray-500 text-sm font-medium">毎日更新・最高額をリアルタイム検知</div>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--primary)] font-bold uppercase tracking-widest border-b-2 border-transparent group-hover:border-[var(--primary)] transition-all">
                    Check Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                <Link
                  href="/blog/best-point-sites-2025"
                  className="group bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Award size={120} />
                  </div>
                  <Award size={36} strokeWidth={2.5} className="text-[var(--accent-amber)] mb-6" />
                  <div className="text-2xl font-bold text-gray-900 mb-2 leading-tight">おすすめサイト<br />厳選3選</div>
                  <div className="text-gray-500 text-sm font-medium">10サイト以上を徹底比較して決定</div>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--accent-amber)] font-bold uppercase tracking-widest border-b-2 border-transparent group-hover:border-[var(--accent-amber)] transition-all">
                    Read Report <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
                <Link
                  href="/introduction-codes"
                  className="group bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Gift size={120} />
                  </div>
                  <Gift size={36} strokeWidth={2.5} className="text-emerald-600 mb-6" />
                  <div className="text-2xl font-bold text-gray-900 mb-2 leading-tight">招待コード特典<br />最新まとめ</div>
                  <div className="text-gray-500 text-sm font-medium">最大2,600円分の登録ボーナス</div>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm text-emerald-600 font-bold uppercase tracking-widest border-b-2 border-transparent group-hover:border-emerald-600 transition-all">
                    Get Bonus <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>

        {/* ===== List Zone: 白背景バンドで「一覧エリア」を明確に分離 ===== */}
        <div className="bg-white rounded-t-2xl -mt-12 relative z-10 shadow-sm pb-32">
          <main className="max-w-6xl mx-auto px-4 pt-20">
            <InteractiveDealSection initialDeals={initialDeals} totalCount={totalCount}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
                {initialDeals.slice(0, 6).map((deal, index) => (
                  <ServerDealCard key={deal.id || index} deal={deal} index={index} />
                ))}
              </div>
            </InteractiveDealSection>

            {/* Invite Summary (Compact Version for Home) */}
            <section className="mt-32">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">紹介特典でお得に登録</h2>
                  <p className="text-gray-500 font-medium">当サイトの紹介コードで最大2,600円分ボーナス</p>
                </div>
                <Link
                  href="/introduction-codes"
                  className="hidden md:flex items-center gap-2 text-[var(--primary)] font-bold uppercase tracking-widest text-sm hover:underline"
                >
                  View All <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { key: 'moppy', name: 'モッピー', bonus: '2,530円' },
                  { key: 'hapitas', name: 'ハピタス', bonus: '2,600円' },
                  { key: 'chobirich', name: 'ちょびリッチ', bonus: '2,500円' },
                  { key: 'ecnavi', name: 'ECナビ', bonus: '1,500円' },
                  { key: 'powl', name: 'Powl', bonus: '300円' },
                ].map((site) => (
                  <Link
                    key={site.key}
                    href={`/invite/${site.key}`}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center hover:shadow-sm transition-all duration-300 group"
                  >
                    <div className="font-bold text-gray-900 group-hover:text-[var(--primary)] transition-colors mb-1">{site.name}</div>
                    <div className="text-[var(--primary)] font-bold text-xl">{site.bonus}</div>
                  </Link>
                ))}
              </div>
              <div className="md:hidden text-center mt-8">
                <Link
                  href="/introduction-codes"
                  className="inline-flex items-center gap-2 bg-gray-50 text-gray-600 px-6 py-3 rounded-full font-bold"
                >
                  全12サイトの招待コード一覧
                  <ArrowRight size={14} />
                </Link>
              </div>
            </section>

            {/* Category Directory Section (Institutional Grid Layout) */}
            <section className="mt-32">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b-2 border-gray-900 pb-2 inline-block">カテゴリから探す</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-t border-l border-gray-200 bg-white">
                {[
                  { name: 'クレジットカード', slug: 'credit-card' },
                  { name: 'FX・投資', slug: 'fx-investment' },
                  { name: '銀行・口座', slug: 'bank-account' },
                  { name: '通信・回線', slug: 'internet' },
                  { name: 'ショッピング', slug: 'shopping' },
                  { name: '旅行', slug: 'travel' },
                  { name: '美容・健康', slug: 'beauty' },
                  { name: 'サービス利用', slug: 'service' },
                  { name: 'スマホアプリ', slug: 'app' },
                  { name: '不動産・セミナー', slug: 'real-estate' },
                  { name: 'フード', slug: 'food' },
                  { name: 'キャッシング・ローン', slug: 'cashing-loan' },
                ].map((category) => (
                  <Link
                    key={category.slug}
                    href={`/directory/${category.slug}`}
                    className="flex items-center justify-between border-b border-r border-gray-200 p-4 hover:bg-gray-50 transition-colors duration-0"
                  >
                    <span className="text-sm font-bold text-gray-800">{category.name}</span>
                    <span className="text-gray-400 text-xs">→</span>
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}
