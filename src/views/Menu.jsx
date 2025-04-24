import React from "react";
import MenuCategory from "../components/MenuCategory";
import "../style/menu.css";

const Menu = () => {
  const menuItems = [
    {
      name: "Mini Garlic Bread Bites",
      price: 3.9,
      category: 1,
      allergens: ["1", "3"],
      description: "Toasted garlic bread with herb butter",
      lang: "en",
    },
    {
      name: "Cheesy Garlic Sticks",
      price: 4.5,
      category: 1,
      allergens: ["1", "3"],
      description:
        "Warm breadsticks loaded with garlic butter and melted cheese",
      lang: "en",
    },
    {
      name: "Mini Mozzarella Bites",
      price: 5.0,
      category: 1,
      allergens: ["1", "3"],
      description: "Deep-fried mozzarella balls served with marinara dip",
      lang: "en",
    },
    {
      name: "Tomato Soup Shot",
      price: 3.5,
      category: 1,
      allergens: ["3"],
      description:
        "A rich and creamy tomato soup in a small game-friendly portion",
      lang: "en",
    },
    {
      name: "Boardwalk Bites Sampler",
      price: 6.9,
      category: 1,
      allergens: ["1", "2", "3"],
      description:
        "A mix of mini starters: fries, cheese sticks, and onion rings",
      lang: "en",
    },
    {
      name: "Classic Cheeseburger",
      price: 12.9,
      category: 2,
      allergens: ["1", "2", "3"],
      description:
        "Juicy beef patty, cheddar cheese, house sauce in a toasted bun",
      lang: "en",
    },
    {
      name: "Vegan Stack Burger",
      price: 11.5,
      category: 2,
      allergens: ["1"],
      description:
        "Plant-based patty, grilled veggies, vegan mayo, whole grain bun",
      lang: "en",
    },
    {
      name: "Spicy Fish Tacos",
      price: 10.5,
      category: 2,
      allergens: ["1", "2", "3", "6"],
      description: "Fried fish, slaw, and spicy mayo in soft taco shells",
      lang: "en",
    },
    {
      name: "Seafood Mac & Cheese",
      price: 11.9,
      category: 2,
      allergens: ["1", "3", "5"],
      description: "Creamy mac and cheese with shrimp and squid",
      lang: "en",
    },
    {
      name: "Meeple Mega Burger",
      price: 13.5,
      category: 2,
      allergens: ["1", "2", "3"],
      description:
        "Double beef patties, double cheese, and onion rings in a stacker bun",
      lang: "en",
    },
    {
      name: "Critical Hit Chicken Wrap",
      price: 9.9,
      category: 2,
      allergens: ["1", "2"],
      description: "Grilled chicken, spicy mayo, salad in a soft tortilla wrap",
      lang: "en",
    },
    {
      name: "Sweet Dice Brownie",
      price: 4.5,
      category: 3,
      allergens: ["1", "2", "3", "4"],
      description: "Rich chocolate brownie with nut topping and vanilla sauce",
      lang: "en",
    },
    {
      name: "Dice Tower Donuts",
      price: 4.2,
      category: 3,
      allergens: ["1", "2", "3"],
      description:
        "Mini stacked donuts with chocolate drizzle and colorful sprinkles",
      lang: "en",
    },
    {
      name: "Victory Cupcake Duo",
      price: 4.5,
      category: 3,
      allergens: ["1", "2", "3"],
      description: "Two colorful cupcakes—chocolate and vanilla",
      lang: "en",
    },
    {
      name: "Hex Tile Apple Pie",
      price: 4.9,
      category: 3,
      allergens: ["1", "2", "3"],
      description: "Mini apple pie with a hex-pattern crust",
      lang: "en",
    },
    {
      name: "Game Night Milkshake",
      price: 5.0,
      category: 4,
      allergens: ["3"],
      description: "Thick vanilla shake topped with whipped cream",
      lang: "en",
    },
    {
      name: "Pepsi (0.33L)",
      price: 2.8,
      category: 4,
      allergens: [],
      description: "Pepsi (0.33L)",
      lang: "en",
    },
    {
      name: "7 up (0.33L)",
      price: 2.8,
      category: 4,
      allergens: [],
      description: "7 up (0.33L)",
      lang: "en",
    },
    {
      name: "Fanta (0.33L)",
      price: 2.8,
      category: 4,
      allergens: [],
      description: "Fanta (0.33L)",
      lang: "en",
    },
    {
      name: "Local Craft Beer (0.5L)",
      price: 6.5,
      category: 4,
      allergens: ["1"],
      description: "Rotating selection of local craft beer, ask your server",
      lang: "en",
    },
    {
      name: "Long Drink",
      price: 6.5,
      category: 4,
      allergens: [],
      description: "",
      lang: "en",
    },
    {
      name: "Apple Juice (0.33L)",
      price: 2.0,
      category: 4,
      allergens: [],
      description: "Cold-pressed apple juice",
      lang: "en",
    },
    {
      name: "Mana Potion Smoothie",
      price: 4.8,
      category: 4,
      allergens: ["3"],
      description: "Blueberry-banana yogurt smoothie to recharge your energy",
      lang: "en",
    },
    {
      name: "Potion of Refreshment (Iced Tea)",
      price: 3.2,
      category: 4,
      allergens: [],
      description: "Magically chilled citrus iced tea",
      lang: "en",
    },
    {
      name: "Potion of Power",
      price: 3.5,
      category: 4,
      allergens: [],
      description:
        "A boost of energy with a refreshing citrus flavor to keep you alert during game night",
      lang: "en",
    },
    {
      name: "Wizard's Brew (Coffee)",
      price: 3.0,
      category: 4,
      allergens: [],
      description:
        "A strong and bold hot coffee to keep your mind sharp and your game strong.",
      lang: "en",
    },
    {
      name: "Chicken Nuggets & Dip",
      price: 8.9,
      category: 5,
      allergens: ["1", "2"],
      description: "Crispy chicken bites with garlic mayo and BBQ dip",
      lang: "en",
    },
    {
      name: "Board Game Fries",
      price: 4.9,
      category: 5,
      allergens: ["3"],
      description: "Skin-on fries with melted cheese and herbs",
      lang: "en",
    },
    {
      name: "Nuts for Nachos",
      price: 7.9,
      category: 5,
      allergens: ["1", "3", "4"],
      description: "Cheesy nachos with jalapeños and nut crumble",
      lang: "en",
    },
    {
      name: "Critical Crunch Mix",
      price: 3.5,
      category: 5,
      allergens: ["4"],
      description: "Sweet and salty snack mix with nuts and candy dice",
      lang: "en",
    },
    {
      name: "Token Trail Mix",
      price: 3.9,
      category: 5,
      allergens: ["4"],
      description: "Nutty trail mix with chocolate chips and dried fruit",
      lang: "en",
    },
    {
      name: "Dicey Popcorn",
      price: 3.0,
      category: 5,
      allergens: [],
      description: "Buttery popcorn with a sprinkle of cheese seasoning",
      lang: "en",
    },
    {
      name: "Minivalkosipulileipäset",
      price: 3.9,
      category: 1,
      allergens: ["1", "3"],
      description: "Paahdettua valkosipulileipää yrttivoilla",
      lang: "fi",
    },
    {
      name: "Juustoiset valkosipulitikut",
      price: 4.5,
      category: 1,
      allergens: ["1", "3"],
      description:
        "Lämpimiä leipätikkuja täynnä valkosipulivoita ja sulanutta juustoa",
      lang: "fi",
    },
    {
      name: "Mozarellapalaset",
      price: 5.0,
      category: 1,
      allergens: ["1", "3"],
      description: "Uppopaistettuja mozzarellapalloja marinaradipin kera",
      lang: "fi",
    },
    {
      name: "Tomaattikeittoshotti",
      price: 3.5,
      category: 1,
      allergens: ["3"],
      description:
        "Täyteläinen ja kermainen tomaattikeitto pienessä, pelikäyttöön sopivassa annoksessa",
      lang: "fi",
    },
    {
      name: "Napostelulajitelma",
      price: 6.9,
      category: 1,
      allergens: ["1", "2", "3"],
      description:
        "Lajitelma minialkuruokia: ranskalaisia, juustotikkuja ja sipulirenkaita",
      lang: "fi",
    },
    {
      name: "Juustohampurilainen",
      price: 12.9,
      category: 2,
      allergens: ["1", "2", "3"],
      description:
        "Mehevä naudanlihapihvi, cheddarjuustoa ja talon kastiketta paahdetussa sämpylässä",
      lang: "fi",
    },
    {
      name: "Vegeburgeri",
      price: 11.5,
      category: 2,
      allergens: ["1"],
      description:
        "Kasvipohjainen pihvi, grillattuja vihanneksia, vegaanimajoneesia ja täysjyväsämpylä",
      lang: "fi",
    },
    {
      name: "Tuliset kalatacot",
      price: 10.5,
      category: 2,
      allergens: ["1", "2", "3", "6"],
      description:
        "Paistettua kalaa, kaalisalaattia ja tulista majoneesia pehmeissä tacokuorissa",
      lang: "fi",
    },
    {
      name: "Juustomakaroni merenelävillä",
      price: 11.9,
      category: 2,
      allergens: ["1", "3", "5"],
      description: "Kermainen mac & cheese katkaravuilla ja mustekalalla",
      lang: "fi",
    },
    {
      name: "Meeple-megaburgeri",
      price: 13.5,
      category: 2,
      allergens: ["1", "2", "3"],
      description:
        "Kaksi naudanlihapihviä, tuplajuusto ja sipulirenkaat tornisämpylässä",
      lang: "fi",
    },
    {
      name: "Kriittinen osuma- kanawrap",
      price: 9.9,
      category: 2,
      allergens: ["1", "2"],
      description:
        "Grillattua kanaa, tulista majoneesia ja salaattia pehmeässä tortillawrapissa",
      lang: "fi",
    },
    {
      name: "Noppabrownie",
      price: 4.5,
      category: 3,
      allergens: ["1", "2", "3", "4"],
      description:
        "Täyteläinen suklaabrownie pähkinäkuorrutteella ja vaniljakastikkeella",
      lang: "fi",
    },
    {
      name: "Noppatornidonitsit",
      price: 4.2,
      category: 3,
      allergens: ["1", "2", "3"],
      description:
        "Minikokoisia pinottuja donitseja suklaakuorrutteella ja värikkäillä strösseleillä",
      lang: "fi",
    },
    {
      name: "Voittokuppikakku-duo",
      price: 4.5,
      category: 3,
      allergens: ["1", "2", "3"],
      description: "Kaksi värikästä kuppikakkua – suklaa ja vanilja",
      lang: "fi",
    },
    {
      name: "Omenapiirakka",
      price: 4.9,
      category: 3,
      allergens: ["1", "2", "3"],
      description: "Minikokoinen omenapiirakka heksakuvioisella kannella",
      lang: "fi",
    },
    {
      name: "Peli-illan pirtelö",
      price: 5.0,
      category: 4,
      allergens: ["3"],
      description: "Paksu vaniljapirtelö kermavaahdolla",
      lang: "fi",
    },
    {
      name: "Pepsi (0.33L)",
      price: 2.8,
      category: 4,
      allergens: [],
      description: "Pepsi (0.33L)",
      lang: "fi",
    },
    {
      name: "7 up (0.33L)",
      price: 2.8,
      category: 4,
      allergens: [],
      description: "7 up (0.33L)",
      lang: "fi",
    },
    {
      name: "Fanta (0.33L)",
      price: 2.8,
      category: 4,
      allergens: [],
      description: "Fanta (0.33L)",
      lang: "fi",
    },
    {
      name: "Paikallinen olut",
      price: 6.5,
      category: 4,
      allergens: ["1"],
      description:
        "Vaihteleva valikoima paikallisia käsityöoluita – kysy tarjoilijalta",
      lang: "fi",
    },
    {
      name: "Lonkero",
      price: 6.5,
      category: 4,
      allergens: [],
      description: "Lonkero",
      lang: "fi",
    },
    {
      name: "Appelsiinimehu",
      price: 2.0,
      category: 4,
      allergens: [],
      description: "Kylmäpuristettu omenamehu",
      lang: "fi",
    },
    {
      name: "Manajuomasmoothie",
      price: 4.8,
      category: 4,
      allergens: ["3"],
      description: "Mustikka-banaani-jogurttismoothie energian palauttamiseen",
      lang: "fi",
    },
    {
      name: "Virkistysliemi (jäätee)",
      price: 3.2,
      category: 4,
      allergens: [],
      description: "Taianomaisesti viilennetty sitrusjäätee",
      lang: "fi",
    },
    {
      name: "Voimajuoma",
      price: 3.5,
      category: 4,
      allergens: [],
      description:
        "Energiajuoma raikkaalla sitrusmaulla pitää sinut virkeänä peliyönä",
      lang: "fi",
    },
    {
      name: "Velhon keitos (kahvi)",
      price: 3.0,
      category: 4,
      allergens: [],
      description:
        "Vahvaa ja täyteläistä kuumaa kahvia pitääksesi mielesi terävänä ja pelisi vahvana",
      lang: "fi",
    },
    {
      name: "Kananugetit ja dippi",
      price: 8.9,
      category: 5,
      allergens: ["1", "2"],
      description: "Rapeita kanapaloja valkosipulimajoneesin ja BBQ-dipin kera",
      lang: "fi",
    },
    {
      name: "Lautapeliranskalaiset",
      price: 4.9,
      category: 5,
      allergens: ["3"],
      description:
        "Kuorineen paistetut ranskalaiset sulaneella juustolla ja yrteillä",
      lang: "fi",
    },
    {
      name: "Pähkinät nachojen kera",
      price: 7.9,
      category: 5,
      allergens: ["1", "3", "4"],
      description: "Juustonachoja jalapeñoilla ja pähkinämurulla",
      lang: "fi",
    },
    {
      name: "Kriittinen napostelusekoitus",
      price: 3.5,
      category: 5,
      allergens: ["4"],
      description:
        "Makea ja suolainen napostelusekoitus pähkinöillä ja karkkinopilla",
      lang: "fi",
    },
    {
      name: "Pelimerkki-polkusekoitus",
      price: 3.9,
      category: 5,
      allergens: ["4"],
      description:
        "Pähkinäinen retkisekoitus suklaahipuilla ja kuivatuilla hedelmillä",
      lang: "fi",
    },
    {
      name: "Noppapopparit",
      price: 3.0,
      category: 5,
      allergens: [],
      description: "Voipopcornia juustomausteella",
      lang: "fi",
    },
  ];

  const filteredItems = menuItems.filter((item) => item.lang === "en");

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="menu-page">
      <h1>Our Menu</h1>
      {Object.entries(groupedItems).map(([categoryId, items]) => (
        <MenuCategory
          key={categoryId}
          categoryId={parseInt(categoryId)}
          items={items}
        />
      ))}
    </div>
  );
};

export default Menu;
