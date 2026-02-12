import DocListRow from "@/components/DocListRow";
import { getDocsList } from "@/data/docs";

export default function DocsPage() {
  const docs = getDocsList();
  const fullDoc = docs[0]; // 全体資料（1件）
  const splitDocs = docs.slice(1); // 分割資料

  const sectionSeparator = (
    <div className="border-b border-[var(--border-color)] my-6" aria-hidden />
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[960px] mx-auto px-4 pt-2 pb-10">
        <section>
          <h2 className="text-white font-bold text-lg mb-2">資料一覧</h2>
          <p className="text-white text-[12px] md:text-sm mb-6 text-left">
            確認されたい資料をクリックして、詳細をご確認ください。
          </p>

          {docs.length === 0 ? (
            <p className="text-[var(--secondary-text)] py-8 text-center">資料はありません。</p>
          ) : (
            <div className="flex flex-col gap-0">
              {fullDoc && (
                <>
                  <h3 className="text-white text-sm font-semibold mb-2">全編資料</h3>
                  <div className="flex flex-col gap-1">
                    <DocListRow key={fullDoc.id} doc={fullDoc} />
                  </div>
                  {splitDocs.length > 0 && sectionSeparator}
                </>
              )}
              {splitDocs.length > 0 && (
                <>
                  <h3 className="text-white text-sm font-semibold mb-2">分割資料</h3>
                  <p className="text-white text-[12px] md:text-sm mb-3 text-left">
                    全編資料を分割した各項目のPDFを用意しております。確認されたい資料をクリックしてご覧ください。
                  </p>
                  <div className="flex flex-col gap-1">
                    {splitDocs.map((doc) => (
                      <DocListRow key={doc.id} doc={doc} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
