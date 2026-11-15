"use client";

import { useEffect, useState } from "react";

type Language = "en" | "es";
type Theme = "light" | "dark";
type Category = "Tops" | "Hoodies" | "Accessories";
type Filter = "All pieces" | Category;

type Product = {
  id: number;
  name: Record<Language, string>;
  category: Category;
  price: number;
  image: string;
  tag: "BEST SELLER" | "NEW DROP" | "LIMITED" | "LOW STOCK" | "JUST IN";
  color: Record<Language, string>;
};

type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: { en: "Afterimage Tee", es: "Camiseta Afterimage" },
    category: "Tops",
    price: 38,
    image: "photo-1521572163474-6864f9cf17ab",
    tag: "BEST SELLER",
    color: { en: "Bone", es: "Hueso" },
  },
  {
    id: 2,
    name: { en: "Night Shift Hoodie", es: "Sudadera Turno Nocturno" },
    category: "Hoodies",
    price: 78,
    image: "photo-1551028719-00167b16eac5",
    tag: "NEW DROP",
    color: { en: "Washed black", es: "Negro desgastado" },
  },
  {
    id: 3,
    name: { en: "Static Bloom Tee", es: "Camiseta Flor Estática" },
    category: "Tops",
    price: 42,
    image: "photo-1529139574466-a303027c1d8b",
    tag: "LIMITED",
    color: { en: "Charcoal", es: "Carbón" },
  },
  {
    id: 4,
    name: { en: "Phantom Overshirt", es: "Sobrecamisa Fantasma" },
    category: "Hoodies",
    price: 92,
    image: "photo-1551488831-00ddcb6c6bd3",
    tag: "NEW DROP",
    color: { en: "Ink", es: "Tinta" },
  },
  {
    id: 5,
    name: { en: "Signal Cap", es: "Gorra Señal" },
    category: "Accessories",
    price: 32,
    image: "photo-1588850561407-ed78c282e89b",
    tag: "LOW STOCK",
    color: { en: "Black", es: "Negro" },
  },
  {
    id: 6,
    name: { en: "Midnight Layers Tee", es: "Camiseta Capas de Medianoche" },
    category: "Tops",
    price: 38,
    image: "photo-1503342217505-b0a15ec3261c",
    tag: "JUST IN",
    color: { en: "Smoke", es: "Humo" },
  },
];

const sizes = ["S", "M", "L", "XL"];
const filters: Filter[] = ["All pieces", "Tops", "Hoodies", "Accessories"];

const translations = {
  en: {
    metaTitle: "Kitsune Wear — Anime-Inspired Streetwear",
    metaDescription:
      "Anime spirit, street-level energy. Discover the latest small-batch streetwear from Kitsune Wear.",
    shippingBanner: "FREE SHIPPING ON ORDERS OVER $100",
    tagline: "MADE FOR THE MAIN CHARACTER",
    home: "Kitsune Wear home",
    mainNavigation: "Main navigation",
    shopAll: "SHOP ALL",
    ourStory: "OUR STORY",
    contact: "CONTACT",
    openBag: (count: number) => `Open shopping bag, ${count} ${count === 1 ? "item" : "items"}`,
    bag: (count: number) => `BAG (${count})`,
    heroEyebrow: "TOKYO AFTER DARK · DROP 001",
    heroTitle: <>Wear your<br /><span>own story.</span></>,
    heroDescription: "Anime spirit. Street-level energy. Pieces for wherever your story takes you.",
    shopDrop: "SHOP THE DROP",
    designedFor: <>DESIGNED FOR<br />THE UNORDINARY</>,
    heroImage: "Streetwear look from the Kitsune Wear collection",
    nightIsYours: <>THE<br />NIGHT<br />IS YOURS</>,
    independentCulture: "KITSUNE WEAR · INDEPENDENT STREET CULTURE",
    brandMessage: "Kitsune Wear brand message",
    ticker: <>OWN YOUR ENERGY <i>✳</i> NO SIDE CHARACTERS <i>✳</i> STAY UNORDINARY <i>✳</i></>,
    tags: {
      "BEST SELLER": "BEST SELLER",
      "NEW DROP": "NEW DROP",
      LIMITED: "LIMITED",
      "LOW STOCK": "LOW STOCK",
      "JUST IN": "JUST IN",
    } satisfies Record<Product["tag"], string>,
    shopEyebrow: "THE FIRST CHAPTER",
    shopTitle: <>Fresh from<br className="mobile-break" /> the <span>fox den.</span></>,
    shopDescription: "Small-batch streetwear for anime heads, night owls, and everyone writing their own plot.",
    filtersLabel: "Filter products",
    filters: {
      "All pieces": "All pieces",
      Tops: "Tops",
      Hoodies: "Hoodies",
      Accessories: "Accessories",
    } satisfies Record<Filter, string>,
    pieces: (count: number) => `${String(count).padStart(2, "0")} PIECES`,
    productImage: (name: string, color: string) => `${name} in ${color}`,
    addProduct: (name: string) => `Add ${name} to bag`,
    chooseSize: (name: string) => `Choose a size for ${name}`,
    size: (size: string) => `Size ${size}`,
    addToBag: "ADD TO BAG",
    aboutUs: "A LITTLE ABOUT US",
    storyTitle: <>For the ones<br />who <span>feel it all.</span></>,
    storyDescription:
      "Kitsune Wear is a love letter to the worlds that raised us and the ones we're still creating. Graphic streetwear, made in small drops. No background characters here.",
    nextFit: "FIND YOUR NEXT FIT",
    storyImage: "Kitsune Wear streetwear editorial",
    afterHours: "AFTER HOURS, ALWAYS.",
    originalBadge: "KW ORIGINAL",
    nextDrop: "THE NEXT DROP WON'T WAIT.",
    newsletterTitle: <>Get in on the <span>story.</span></>,
    followDrop: "FOLLOW THE DROP",
    independentFooter: "INDEPENDENT STREET CULTURE · EST. 2025",
    instagram: "INSTAGRAM",
    copyright: "© 2025 KITSUNE WEAR",
    nextChapter: "YOUR NEXT CHAPTER",
    cartTitle: (count: number) => <>THE BAG <span>({count})</span></>,
    closeBag: "Close shopping bag",
    emptyCart: "Your story starts with a good fit.",
    keepExploring: "KEEP EXPLORING",
    removeOne: (name: string) => `Remove one ${name}`,
    addOne: (name: string) => `Add one ${name}`,
    subtotal: "SUBTOTAL",
    shippingNote: "Shipping and payment are arranged with us on WhatsApp.",
    orderViaWhatsapp: "ORDER VIA WHATSAPP",
    continueShopping: "CONTINUE SHOPPING",
    orderGreeting: "Hi Kitsune Wear! I'd like to place an order:",
    orderLine: (quantity: number, name: string, size: string, price: number) =>
      `${quantity} x ${name} (${size}) — $${price}`,
    orderShipping: "Please let me know about shipping and payment.",
    enableDarkMode: "Enable dark mode",
    enableLightMode: "Enable light mode",
    darkMode: "DARK",
    lightMode: "LIGHT",
    switchToEnglish: "Switch language to English",
    switchToSpanish: "Switch language to Spanish",
    languageLabel: "Language",
  },
  es: {
    metaTitle: "Kitsune Wear — Ropa urbana inspirada en el anime",
    metaDescription:
      "Espíritu anime, energía urbana. Descubre las últimas prendas urbanas en pequeñas ediciones de Kitsune Wear.",
    shippingBanner: "ENVÍO GRATIS EN PEDIDOS SUPERIORES A $100",
    tagline: "HECHO PARA SER EL PROTAGONISTA",
    home: "Inicio de Kitsune Wear",
    mainNavigation: "Navegación principal",
    shopAll: "VER TODO",
    ourStory: "NUESTRA HISTORIA",
    contact: "CONTACTO",
    openBag: (count: number) =>
      `Abrir bolsa de compras, ${count} artículo${count === 1 ? "" : "s"}`,
    bag: (count: number) => `BOLSA (${count})`,
    heroEyebrow: "TOKIO DESPUÉS DEL ANOCHECER · DROP 001",
    heroTitle: <>Tu estilo.<br /><span>Tu historia.</span></>,
    heroDescription: "Espíritu anime. Energía urbana. Prendas para cada rumbo que tome tu historia.",
    shopDrop: "VER LA COLECCIÓN",
    designedFor: <>DISEÑADO PARA<br />LO EXTRAORDINARIO</>,
    heroImage: "Estilo urbano de la colección Kitsune Wear",
    nightIsYours: <>LA<br />NOCHE<br />ES TUYA</>,
    independentCulture: "KITSUNE WEAR · CULTURA URBANA INDEPENDIENTE",
    brandMessage: "Mensaje de marca de Kitsune Wear",
    ticker: <>VIVE TU ENERGÍA <i>✳</i> NADA DE PERSONAJES SECUNDARIOS <i>✳</i> SÉ EXTRAORDINARIO <i>✳</i></>,
    tags: {
      "BEST SELLER": "MÁS VENDIDO",
      "NEW DROP": "NOVEDAD",
      LIMITED: "EDICIÓN LIMITADA",
      "LOW STOCK": "POCAS UNIDADES",
      "JUST IN": "RECIÉN LLEGADO",
    } satisfies Record<Product["tag"], string>,
    shopEyebrow: "EL PRIMER CAPÍTULO",
    shopTitle: <>Desde el<br className="mobile-break" /> <span>refugio.</span></>,
    shopDescription: "Ropa urbana en ediciones pequeñas para fans del anime, noctámbulos y quienes escriben su propia historia.",
    filtersLabel: "Filtrar productos",
    filters: {
      "All pieces": "Todo",
      Tops: "Camisetas",
      Hoodies: "Sudaderas",
      Accessories: "Accesorios",
    } satisfies Record<Filter, string>,
    pieces: (count: number) => `${String(count).padStart(2, "0")} PRENDAS`,
    productImage: (name: string, color: string) => `${name} en color ${color}`,
    addProduct: (name: string) => `Añadir ${name} a la bolsa`,
    chooseSize: (name: string) => `Elige la talla de ${name}`,
    size: (size: string) => `Talla ${size}`,
    addToBag: "AÑADIR A LA BOLSA",
    aboutUs: "UN POCO SOBRE NOSOTROS",
    storyTitle: <>Para quien<br />lo <span>siente todo.</span></>,
    storyDescription:
      "Kitsune Wear es una carta de amor a los mundos que nos formaron y a los que aún estamos creando. Ropa urbana gráfica, en pequeñas ediciones. Aquí nadie es un personaje secundario.",
    nextFit: "ENCUENTRA TU PRÓXIMO LOOK",
    storyImage: "Editorial de ropa urbana de Kitsune Wear",
    afterHours: "SIEMPRE DESPUÉS DEL ANOCHECER.",
    nextDrop: "LA PRÓXIMA COLECCIÓN NO ESPERA.",
    newsletterTitle: <>Sé parte de la <span>historia.</span></>,
    followDrop: "SIGUE LA COLECCIÓN",
    independentFooter: "CULTURA URBANA INDEPENDIENTE · DESDE 2025",
    instagram: "INSTAGRAM",
    copyright: "© 2025 KITSUNE WEAR",
    originalBadge: "ORIGINAL DE KW",
    nextChapter: "TU PRÓXIMO CAPÍTULO",
    cartTitle: (count: number) => <>LA BOLSA <span>({count})</span></>,
    closeBag: "Cerrar bolsa de compras",
    emptyCart: "Tu historia empieza con un buen look.",
    keepExploring: "SEGUIR EXPLORANDO",
    removeOne: (name: string) => `Quitar una unidad de ${name}`,
    addOne: (name: string) => `Añadir una unidad de ${name}`,
    subtotal: "SUBTOTAL",
    shippingNote: "Coordinaremos el envío y el pago contigo por WhatsApp.",
    orderViaWhatsapp: "PEDIR POR WHATSAPP",
    continueShopping: "SEGUIR COMPRANDO",
    orderGreeting: "¡Hola, Kitsune Wear! Quiero hacer un pedido:",
    orderLine: (quantity: number, name: string, size: string, price: number) =>
      `${quantity} x ${name} (talla ${size}) — $${price}`,
    orderShipping: "Por favor, indíquenme las opciones de envío y pago.",
    enableDarkMode: "Activar modo oscuro",
    enableLightMode: "Activar modo claro",
    darkMode: "OSCURO",
    lightMode: "CLARO",
    switchToEnglish: "Cambiar idioma a inglés",
    switchToSpanish: "Cambiar idioma a español",
    languageLabel: "Idioma",
  },
} as const;

function FoxMark() {
  return (
    <svg aria-hidden="true" className="fox-mark" viewBox="0 0 42 42" fill="none">
      <path d="M7 5.5 18.5 12 21 21 8 34 4.5 20.5 7 5.5Z" fill="currentColor" />
      <path d="m35 5.5-11.5 6.5L21 21l13 13 3.5-13.5L35 5.5Z" fill="currentColor" />
      <path d="m8 34 13-13 13 13-13 4.5L8 34Z" fill="currentColor" />
      <path d="m14 25 7 4 7-4-7 9-7-9Z" fill="#F3EFE7" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M5 8h14l1 13H4L5 8Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<Filter>("All pieces");
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("kitsune-language");
    const savedTheme = window.localStorage.getItem("kitsune-theme");
    if (savedLanguage === "en" || savedLanguage === "es") setLanguage(savedLanguage);
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    setPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    window.localStorage.setItem("kitsune-language", language);
    window.localStorage.setItem("kitsune-theme", theme);
    document.documentElement.lang = language;
    document.title = t.metaTitle;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t.metaDescription);
  }, [language, theme, preferencesLoaded, t.metaDescription, t.metaTitle]);

  const visibleProducts =
    activeFilter === "All pieces"
      ? products
      : products.filter((product) => product.category === activeFilter);
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const orderMessage = [
    t.orderGreeting,
    "",
    ...cart.map(
      ({ product, size, quantity }) =>
        t.orderLine(quantity, product.name[language], size, product.price * quantity),
    ),
    "",
    `${t.subtotal}: $${subtotal}`,
    t.orderShipping,
  ].join("\n");
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(orderMessage)}`;

  function addToCart(product: Product) {
    const size = selectedSizes[product.id] ?? "M";
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.product.id === product.id && item.size === size,
      );
      if (existing) {
        return currentCart.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...currentCart, { product, size, quantity: 1 }];
    });
    setCartOpen(true);
  }

  function changeQuantity(productId: number, size: string, change: number) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  return (
    <main className="storefront" data-theme={theme} lang={language}>
      <div className="announcement">
        <span>{t.shippingBanner}</span>
        <span className="announcement-mark">✳</span>
        <span>{t.tagline}</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#" aria-label={t.home}>
          <FoxMark />
          <span>KITSUNE<span className="brand-light">WEAR</span></span>
        </a>
        <nav className="main-nav" aria-label={t.mainNavigation}>
          <a href="#shop">{t.shopAll}</a>
          <a href="#story">{t.ourStory}</a>
          <a href="#footer">{t.contact}</a>
        </nav>
        <div className="header-actions">
          <div className="language-toggle" aria-label={t.languageLabel}>
            <button
              aria-label={t.switchToEnglish}
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
              type="button"
            >
              EN
            </button>
            <button
              aria-label={t.switchToSpanish}
              aria-pressed={language === "es"}
              onClick={() => setLanguage("es")}
              type="button"
            >
              ES
            </button>
          </div>
          <button
            aria-label={theme === "light" ? t.enableDarkMode : t.enableLightMode}
            className="theme-button"
            onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}
            type="button"
          >
            <span aria-hidden="true">{theme === "light" ? "☾" : "☼"}</span>
            <span className="theme-button-label">{theme === "light" ? t.darkMode : t.lightMode}</span>
          </button>
          <button
            aria-label={t.openBag(itemCount)}
            className="bag-button"
            onClick={() => setCartOpen(true)}
            type="button"
          >
            <BagIcon />
            <span>{t.bag(itemCount)}</span>
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> {t.heroEyebrow}</p>
          <h1>{t.heroTitle}</h1>
          <p className="hero-description">{t.heroDescription}</p>
          <a className="button button-light" href="#shop">{t.shopDrop} <span>↗</span></a>
          <div className="hero-note">
            <span className="note-star">✳</span>
            <span>{t.designedFor}</span>
          </div>
        </div>
        <div className="hero-art" role="img" aria-label={t.heroImage}>
          <div className="hero-photo" />
          <div className="hero-image-label">KW—001 / 2025</div>
          <div className="hero-stamp"><span>{t.nightIsYours}</span><i>✳</i></div>
          <div className="hero-vertical">{t.independentCulture}</div>
        </div>
        <div className="hero-index"><span>01</span> / 03</div>
      </section>

      <div className="ticker" aria-label={t.brandMessage}>
        <div className="ticker-track">
          {Array.from({ length: 4 }, (_, index) => (
            <span className="ticker-group" key={index}>
              {t.ticker}
            </span>
          ))}
        </div>
      </div>

      <section className="shop-section" id="shop">
        <div className="section-heading">
          <div>
            <p className="eyebrow dark-eyebrow"><span className="eyebrow-line" /> {t.shopEyebrow}</p>
            <h2>{t.shopTitle}</h2>
          </div>
          <p className="section-description">{t.shopDescription}</p>
        </div>

        <div className="shop-toolbar">
          <div className="filter-list" aria-label={t.filtersLabel}>
            {filters.map((filter) => (
              <button
                aria-pressed={activeFilter === filter}
                className={`filter-button${activeFilter === filter ? " active" : ""}`}
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {t.filters[filter]}
              </button>
            ))}
          </div>
          <span className="product-count">{t.pieces(visibleProducts.length)}</span>
        </div>

        <div className="product-grid">
          {visibleProducts.map((product, index) => {
            const name = product.name[language];
            const color = product.color[language];
            return (
              <article className="product-card" key={product.id}>
                <div className={`product-image product-image-${product.id}`}>
                  <img
                    alt={t.productImage(name, color)}
                    loading={index > 2 ? "lazy" : "eager"}
                    src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=900&q=85`}
                  />
                  <span className="product-tag">{t.tags[product.tag]}</span>
                  <button
                    aria-label={t.addProduct(name)}
                    className="quick-add"
                    onClick={() => addToCart(product)}
                    type="button"
                  >
                    +
                  </button>
                </div>
                <div className="product-info">
                  <div className="product-title-row">
                    <div>
                      <h3>{name}</h3>
                      <p>{color} · {t.filters[product.category]}</p>
                    </div>
                    <span className="product-price">${product.price}</span>
                  </div>
                  <div className="product-buy-row">
                    <div className="size-picker" aria-label={t.chooseSize(name)}>
                      {sizes.map((size) => (
                        <button
                          aria-label={t.size(size)}
                          aria-pressed={(selectedSizes[product.id] ?? "M") === size}
                          className={(selectedSizes[product.id] ?? "M") === size ? "selected" : ""}
                          key={size}
                          onClick={() =>
                            setSelectedSizes((current) => ({ ...current, [product.id]: size }))
                          }
                          type="button"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <button className="add-button" onClick={() => addToCart(product)} type="button">
                      {t.addToBag} <span>↗</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="story-mark"><FoxMark /><span>{t.originalBadge}</span></div>
        <div className="story-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> {t.aboutUs}</p>
          <h2>{t.storyTitle}</h2>
          <p>{t.storyDescription}</p>
          <a className="text-link" href="#shop">{t.nextFit} <span>↗</span></a>
        </div>
        <div className="story-image">
          <img
            alt={t.storyImage}
            loading="lazy"
            src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1100&q=85"
          />
          <span>{t.afterHours}</span>
        </div>
      </section>

      <section className="newsletter">
        <span className="newsletter-star">✳</span>
        <p>{t.nextDrop}</p>
        <h2>{t.newsletterTitle}</h2>
        <a className="button button-dark" href="#footer">{t.followDrop} <span>↗</span></a>
      </section>

      <footer className="site-footer" id="footer">
        <a className="brand footer-brand" href="#" aria-label={t.home}>
          <FoxMark />
          <span>KITSUNE<span className="brand-light">WEAR</span></span>
        </a>
        <p>{t.independentFooter}</p>
        <a className="footer-instagram" href="https://instagram.com" rel="noreferrer" target="_blank">
          {t.instagram} ↗
        </a>
        <span className="copyright">{t.copyright}</span>
      </footer>

      {cartOpen && (
        <div className="cart-layer">
          <button
            aria-label={t.closeBag}
            className="cart-backdrop"
            onClick={() => setCartOpen(false)}
            type="button"
          />
          <aside aria-label={t.bag(itemCount)} aria-modal="true" className="cart-drawer" role="dialog">
            <div className="cart-heading">
              <div>
                <p className="eyebrow dark-eyebrow">{t.nextChapter}</p>
                <h2>{t.cartTitle(itemCount)}</h2>
              </div>
              <button
                aria-label={t.closeBag}
                className="close-cart"
                onClick={() => setCartOpen(false)}
                type="button"
              >
                ×
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <FoxMark />
                <p>{t.emptyCart}</p>
                <button className="button button-dark" onClick={() => setCartOpen(false)} type="button">
                  {t.keepExploring} <span>↗</span>
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(({ product, size, quantity }) => {
                    const name = product.name[language];
                    return (
                      <div className="cart-item" key={`${product.id}-${size}`}>
                        <img
                          alt=""
                          src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=240&q=75`}
                        />
                        <div className="cart-item-copy">
                          <h3>{name}</h3>
                          <p>{product.color[language]} · {t.size(size)}</p>
                          <div className="quantity-control">
                            <button
                              aria-label={t.removeOne(name)}
                              onClick={() => changeQuantity(product.id, size, -1)}
                              type="button"
                            >−</button>
                            <span>{quantity}</span>
                            <button
                              aria-label={t.addOne(name)}
                              onClick={() => changeQuantity(product.id, size, 1)}
                              type="button"
                            >+</button>
                          </div>
                        </div>
                        <span className="cart-item-price">${product.price * quantity}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="cart-summary">
                  <div className="subtotal-row"><span>{t.subtotal}</span><strong>${subtotal}</strong></div>
                  <p>{t.shippingNote}</p>
                  <a
                    className="whatsapp-button"
                    href={whatsappUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t.orderViaWhatsapp} <span>↗</span>
                  </a>
                  <button className="continue-shopping" onClick={() => setCartOpen(false)} type="button">
                    {t.continueShopping}
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
