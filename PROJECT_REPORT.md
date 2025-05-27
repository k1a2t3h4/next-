# 🧾 Project Report: Dynamic E-Commerce Website Using Next.js

## 🔧 Project Stack
- **Framework**: Next.js (with ISR)
- **Frontend**: React (with Dynamic Imports)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **File-based Routing**: Catch-all routes using [[...slug]].js
- **Data**: JSON for page structure

## 📁 Project Structure
```
/pages
  [[...slug]].js             # Catch-all dynamic route
  _app.js                    # Global context providers

/context
  CartContext.js             # Cart operations (add, remove, clear)
  FilterContext.js           # Filtering operations (by category, search)

/src/components
  Header.js, Blog.js, ...    # Dynamically loaded page components

/data
  pages.json                 # Maps slugs to components
```

## 🚦 Routing Algorithm: Infinite Slugs & Dynamic Pages

### ✅ Purpose:
Allow rendering any nested route like:
- `/`
- `/blog/blog-health/blog-heart`
- `/products/product1/detail`

### ✅ How it works:
1. **Catch-all route**: `/pages/[[...slug]].js`
2. **Slug parsing**:
   - If user visits `/products/health/oils`
   - `params.slug = ['products', 'health', 'oils']`
   - Convert to string: 'products/health/oils'
3. **Component lookup**:
   - Load pages.json
   - Find array of components for the slug path
4. **Dynamic import**:
   - Components are imported using `dynamic(() => import(...))`
   - Rendered in the order defined in JSON

## ⚡ ISR Dynamic Rendering Algorithm

### File: `/pages/[[...slug]].js`

```javascript
import fs from 'fs';
import path from 'path';
import dynamic from 'next/dynamic';

const getComponent = (componentName) =>
  dynamic(() => import(`../src/components/${componentName}`), { ssr: false });

export default function DynamicPage({ components }) {
  return (
    <main>
      {components.map(({ name, Component }, idx) => (
        <div key={idx}>
          <Component />
        </div>
      ))}
    </main>
  );
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'pages.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const paths = Object.keys(data).map((slugPath) => {
    const slugArray = slugPath === '' ? [] : slugPath.split('/');
    return { params: { slug: slugArray } };
  });

  return {
    paths,
    fallback: 'blocking' // enables ISR fallback
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'pages.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const slugArray = params.slug || [];
  const slugPath = slugArray.join('/');

  const componentList = data[slugPath];

  if (!componentList) {
    return { notFound: true };
  }

  const components = componentList.map((name) => ({
    name,
    Component: getComponent(name)
  }));

  return {
    props: {
      components
    },
    revalidate: 30 // ISR interval
  };
}
```

### 🧠 Explanation:
- **getStaticPaths**: Generates all valid static paths from the pages.json file
- **fallback: 'blocking'**: Supports new paths via ISR
- **getStaticProps**:
  - Reads slug path
  - Fetches the component list from JSON
  - Dynamically imports components
  - Rebuilds the page every 30 seconds with `revalidate: 30`

## 📦 Dynamic Page Definition: `/data/pages.json`
```json
{
  "": ["Header"],
  "blog": ["Header", "Blog"],
  "products": ["Header", "Product"],
  "products/product1/detail": ["Header", "ProductDetail"]
}
```

## 🛒 CartContext: Global Cart State Management

### ✅ Functions:
- `addToCart(product)`
- `removeFromCart(productId)`
- `clearCart()`
- `cartItems[]`: all current cart items

### ✅ Algorithm:
- Cart items stored in React state
- Add/remove operations update the state and re-render UI
- Can persist to localStorage for persistence

## 🧮 FilterContext: Product Filtering

### ✅ Filters:
- `category`: selected product category
- `searchTerm`: search keyword
- `filterProducts(products)`: returns filtered array

### ✅ Filtering Algorithm:
```javascript
products.filter(product =>
  (!category || product.category === category) &&
  (!searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase()))
)
```

## ⚙️ Context Integration

### ✅ _app.js
```javascript
<CartProvider>
  <FilterProvider>
    <Component {...pageProps} />
  </FilterProvider>
</CartProvider>
```

### ✅ Access in components:
```javascript
const { addToCart } = useCart();
const { filterProducts } = useFilter();
```

## 🔁 Reusable Component Flow
For every route:
1. pages.json defines the list of components
2. Dynamic route page loads components dynamically
3. Global context is injected
4. Components use shared context functions for UI logic

### ✅ Advantages
- 🔁 **Reusable pages**: Components assembled dynamically
- 🪝 **Global logic**: Cart and filtering logic available everywhere
- 🌐 **Infinite nesting**: Supports deep URL structures
- ⚡ **Performance**: Static generation with ISR
- 🎯 **Custom control**: Add or remove components per route via JSON 