import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

console.log("✅ website.js loaded");

const supabase = createClient(
  "https://kmapuhoqiowzuphzmlhn.supabase.co",
  "sb_publishable_E5MxXCfusu8vPNUKxV5vmw_A8zFTPmF"
);
window.supabase = supabase;
console.log("Supabase:", supabase);
console.log("✅ Supabase client created", supabase);

async function loadHero() {
  console.log("🚀 Loading Hero...");

  const { data, error } = await supabase
    .from("website_content")
    .select("*")
    .eq("section", "hero");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    console.error("❌ Supabase Error:", error);
    return;
  }

  const title = document.getElementById("hero-title");
  const subtitle = document.getElementById("hero-subtitle");
  const button = document.getElementById("hero-button");

  console.log("Title Element:", title);
  console.log("Subtitle Element:", subtitle);
  console.log("Button Element:", button);

  data.forEach((item) => {
    switch (item.key) {
      case "title":
        if (title) title.innerHTML = item.value;
        break;

      case "subtitle":
        if (subtitle) subtitle.textContent = item.value;
        break;

      case "button":
        if (button) button.textContent = item.value;
        break;
    }
  });

  console.log("✅ Hero loaded successfully");
}

async function loadPricing() {

    const { data, error } = await supabase
        .from("pricing_items")
        .select("*")
        .eq("active", true)
        .order("sort_order");

    if (error) {
        console.error(error);
        return;
    }

    const grid = document.getElementById("pricing-grid");

    if (!grid) {
        console.error("pricing-grid not found");
        return;
    }

    grid.innerHTML = "";

    data.forEach(item => {

        grid.innerHTML += `
            <div class="price-card">

                <h3>${item.title}</h3>

                <div class="amount">
                    ฿${item.price}
                    <span>/ person</span>
                </div>

                <p class="sub">
                    ${item.description.replace(/\n/g,"<br>")}
                </p>

                <a
                    href="https://sevn.ly/xwSJTAfy"
                    target="_blank"
                    class="btn btn-solid">
                    Book Now
                </a>

            </div>
        `;

    });

    console.log("✅ Pricing loaded");

}


async function loadExperience() {

    const { data, error } = await supabase
        .from("experience_items")
        .select("*")
        .eq("active", true)
        .order("sort_order");

    if (error) {
        console.error(error);
        return;
    }

    const grid = document.getElementById("experience-grid");

    if (!grid) {
        console.error("experience-grid not found");
        return;
    }

    grid.innerHTML = "";

    data.forEach(item => {

        grid.innerHTML += `
            <div class="journey-item">

                <div class="temp">
                    ${item.temperature}
                </div>

                <h3>${item.title}</h3>

                <p>${item.description}</p>

            </div>
        `;

    });

    console.log("✅ Experience loaded");

}


window.addEventListener("DOMContentLoaded", () => {

    console.log("📄 DOM Ready");

    loadHero();

    loadPricing();

    loadExperience();

});
