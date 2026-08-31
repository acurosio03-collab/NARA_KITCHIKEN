window.SUPABASE_URL = "https://wwnrcdotwjxgterrhprm.supabase.co";
window.SUPABASE_ANON_KEY = "sb_publishable_vWecM2H8Gvurp3v4EchPRg_WCexKyqk";

window.dbReady = false;
window.db = null;

(function () {
  const ok =
    !!window.SUPABASE_URL &&
    !!window.SUPABASE_ANON_KEY;

  if (!ok) return;

  const s = document.createElement("script");

  s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

  s.onload = () => {
    window.db = supabase.createClient(
      window.SUPABASE_URL,
      window.SUPABASE_ANON_KEY
    );

    window.dbReady = true;

    console.log("Supabase berhasil terhubung!");
  };

  s.onerror = () => {
    console.error("Supabase SDK gagal dimuat.");
  };

  document.head.appendChild(s);
})();
