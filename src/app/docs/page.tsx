import DocListRow from "@/components/DocListRow";
import { getDocsList } from "@/data/docs";

export default function DocsPage() {
  const docs = getDocsList();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-[960px] mx-auto px-4 pt-2 pb-10">
        <section>
          <h2 className="text-white font-bold text-lg mb-4">資料一覧</h2>
          <p className="text-[var(--secondary-text)] text-sm mb-6 text-left">
            確認されたい資料をクリックして、詳細をご確認ください。
          </p>
          <div className="flex flex-col gap-1">
            {docs.length === 0 ? (
              <p className="text-[var(--secondary-text)] py-8 text-center">資料はありません。</p>
            ) : (
              docs.map((doc) => (
                <DocListRow key={doc.id} doc={doc} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
