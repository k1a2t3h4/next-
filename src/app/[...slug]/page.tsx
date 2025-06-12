import { notFound } from 'next/navigation';
import React from 'react';
import { renderSection } from '../../utils/renderSection';

interface PageProps {
  params: {
    slug?: string[];
  };
}

interface Section {
  sectionName: string;
  data: Record<string, any>;
  Section?: Section[];
}

interface ComponentData {
  sectionName: string;
  data: {
    builddata: Record<string, any>;
    styles: Record<string, any>;
    state: {
      key: string;
      type: string;
      initValue: string;
    };
  };
  sections: Section[];
}

// ✅ Enable ISR for this route:
export const revalidate = 10000000000000000000;

export default async function DynamicPage(props: PageProps) {
  const { params } = props;
  const { slug } = params;
  const slugPath = (slug || []).join('/');

  try {
    // ✅ Your R2 data (can be fetched from R2 using ISR-compatible fetch later)
    const data = {
      "/":[
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "StyleShop",
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          },
          sections: [
            {
              sectionName: "Menu",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "menuOpen",
                  type: "boolean",
                  initValue: false
                }
              },
              sections: []
            },
            {
              sectionName: "Routes",
              client: "yes",
              data: {
                builddata: {
                  routes: [
                    { name: "Home", location: "/" },
                    { name: "Products", location: "/products" },
                    { name: "Categories", location: "/categories" },
                    { name: "Profile", location: "/profile", authRequired: true },
                    { name: "My Orders", location: "/orders", authRequired: true }
                  ]
                },
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Search",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "searchQuery",
                  type: "string",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Cart",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Auth",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            }
          ]
        },
        {
          sectionName: "FeaturedProducts",
          data: {
            builddata: {
              title: "Featured Products",
              subtitle: "Our Most Popular Items",
              showCount: 4,
              sortBy: "featured"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          },
          sections: [
            {
              sectionName: "ProductList",
              data: {
                builddata: {
                  products: [
                    {
                      id: '1',
                      name: 'Classic White T-Shirt',
                      description: 'A comfortable white t-shirt made from 100% cotton.',
                      price: 19.99,
                      imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600',
                      inventory: 50
                    },
                    {
                      id: '2',
                      name: 'Slim Fit Jeans',
                      description: 'Modern slim fit jeans perfect for any casual occasion.',
                      price: 49.99,
                      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600',
                      inventory: 30
                    },
                    {
                      id: '3',
                      name: 'Sports Running Shoes',
                      description: 'Lightweight running shoes with excellent cushioning.',
                      price: 79.99,
                      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600',
                      inventory: 25
                    },
                    {
                      id: '4',
                      name: 'Summer Floral Dress',
                      description: 'Beautiful floral pattern dress perfect for summer days.',
                      price: 59.99,
                      imageUrl: 'https://images.unsplash.com/photo-1612722432474-b971cdcea26d?q=80&w=600',
                      inventory: 15
                    }
                  ]
                },
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: [
                {
                  sectionName: "ProductActions",
                  client: "yes",
                  data: {
                    builddata: {},
                    styles: {},
                    state: {
                      key: "productActions",
                      type: "object",
                      initValue: {}
                    }
                  },
                  sections: []
                }
              ]
            }
          ]
        },
        {
          "sectionName": "FeaturedProducts2",
          "data": {
            "builddata": {
              "title": "Featured Products",
              "subtitle": "Our Most Popular Items",
              "showCount": 4,
              "sortBy": "featured"
            },
            "styles": {},
            "state": {
              "key": "",
              "type": "",
              "initValue": ""
            }
          },
          "sections": [
            {
              "sectionName": "ProductList2",
              client: "yes",
              "data": {
                "builddata": {
                  "products": [
                    {
                      "id": "1",
                      "name": "Classic White T-Shirt",
                      "description": "A comfortable white t-shirt made from 100% cotton.",
                      "price": 19.99,
                      "imageUrl": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=600",
                      "inventory": 50
                    },
                    {
                      "id": "2",
                      "name": "Slim Fit Jeans",
                      "description": "Modern slim fit jeans perfect for any casual occasion.",
                      "price": 49.99,
                      "imageUrl": "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600",
                      "inventory": 30
                    },
                    {
                      "id": "3",
                      "name": "Sports Running Shoes",
                      "description": "Lightweight running shoes with excellent cushioning.",
                      "price": 79.99,
                      "imageUrl": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600",
                      "inventory": 25
                    },
                    {
                      "id": "4",
                      "name": "Summer Floral Dress",
                      "description": "Beautiful floral pattern dress perfect for summer days.",
                      "price": 59.99,
                      "imageUrl": "https://images.unsplash.com/photo-1612722432474-b971cdcea26d?q=80&w=600",
                      "inventory": 15
                    }
                  ]
                },
                "styles": {},
                "state": {
                  "key": "",
                  "type": "",
                  "initValue": ""
                }
              },
              "sections": [
                
              ]
            }
          ]
        },
      ],
      "profile": [
        {
          sectionName: "HeroBanner",
          data: {
            builddata: {
              title: "Welcome to StyleShop",
              subtitle: "Your one-stop shop for fashion",
              buttonText: "Shop Now",
              buttonLink: "/products"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        },
      ],
      "not-found": [
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "StyleShop",
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          },
          sections: [
            {
              sectionName: "Menu",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "menuOpen",
                  type: "boolean",
                  initValue: false
                }
              },
              sections: []
            },
            {
              sectionName: "Routes",
              client: "yes",
              data: {
                builddata: {
                  routes: [
                    { name: "Home", location: "/" },
                    { name: "Products", location: "/products" },
                    { name: "Categories", location: "/categories" },
                    { name: "Profile", location: "/profile", authRequired: true },
                    { name: "My Orders", location: "/orders", authRequired: true }
                  ]
                },
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Search",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "searchQuery",
                  type: "string",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Cart",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Auth",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            }
          ]
        },
      ],
      "blog": [
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "StyleShop",
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          },
          sections: [
            {
              sectionName: "Menu",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "menuOpen",
                  type: "boolean",
                  initValue: false
                }
              },
              sections: []
            },
            {
              sectionName: "Routes",
              client: "yes",
              data: {
                builddata: {
                  routes: [
                    { name: "Home", location: "/" },
                    { name: "Products", location: "/products" },
                    { name: "Categories", location: "/categories" },
                    { name: "Profile", location: "/profile", authRequired: true },
                    { name: "My Orders", location: "/orders", authRequired: true }
                  ]
                },
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Search",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "searchQuery",
                  type: "string",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Cart",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Auth",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            }
          ]
        },
      ],
      "categories": [
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "StyleShop",
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          },
          sections: [
            {
              sectionName: "Menu",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "menuOpen",
                  type: "boolean",
                  initValue: false
                }
              },
              sections: []
            },
            {
              sectionName: "Routes",
              client: "yes",
              data: {
                builddata: {
                  routes: [
                    { name: "Home", location: "/" },
                    { name: "Products", location: "/products" },
                    { name: "Categories", location: "/categories" },
                    { name: "Profile", location: "/profile", authRequired: true },
                    { name: "My Orders", location: "/orders", authRequired: true }
                  ]
                },
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Search",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "searchQuery",
                  type: "string",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Cart",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Auth",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            }
          ]
        },
      ],
      "products": [
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "StyleShop",
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          },
          sections: [
            {
              sectionName: "Menu",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "menuOpen",
                  type: "boolean",
                  initValue: false
                }
              },
              sections: []
            },
            {
              sectionName: "Routes",
              client: "yes",
              data: {
                builddata: {
                  routes: [
                    { name: "Home", location: "/" },
                    { name: "Products", location: "/products" },
                    { name: "Categories", location: "/categories" },
                    { name: "Profile", location: "/profile", authRequired: true },
                    { name: "My Orders", location: "/orders", authRequired: true }
                  ]
                },
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Search",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "searchQuery",
                  type: "string",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Cart",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Auth",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            }
          ]
        }
      ],
      "products/product1/detail": [
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "StyleShop",
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          },
          sections: [
            {
              sectionName: "Menu",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "menuOpen",
                  type: "boolean",
                  initValue: false
                }
              },
              sections: []
            },
            {
              sectionName: "Routes",
              client: "yes",
              data: {
                builddata: {
                  routes: [
                    { name: "Home", location: "/" },
                    { name: "Products", location: "/products" },
                    { name: "Categories", location: "/categories" },
                    { name: "Profile", location: "/profile", authRequired: true },
                    { name: "My Orders", location: "/orders", authRequired: true }
                  ]
                },
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Search",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "searchQuery",
                  type: "string",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Cart",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Auth",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            }
          ]
        },
      ],
      "cart": [
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "StyleShop",
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          },
          sections: [
            {
              sectionName: "Menu",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "menuOpen",
                  type: "boolean",
                  initValue: false
                }
              },
              sections: []
            },
            {
              sectionName: "Routes",
              client: "yes",
              data: {
                builddata: {
                  routes: [
                    { name: "Home", location: "/" },
                    { name: "Products", location: "/products" },
                    { name: "Categories", location: "/categories" },
                    { name: "Profile", location: "/profile", authRequired: true },
                    { name: "My Orders", location: "/orders", authRequired: true }
                  ]
                },
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Search",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "searchQuery",
                  type: "string",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Cart",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Auth",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            }
          ]
        },
        {
          sectionName: "CartPage",
          client: "yes",
          data: {
            builddata: {
              title: "Shopping Cart",
              emptyCartTitle: "Your cart is empty",
              emptyCartMessage: "Add items to your cart to see them here.",
              continueShoppingText: "Continue Shopping",
              continueShoppingLink: "/products",
              orderSummaryTitle: "Order Summary",
              shippingText: "Shipping",
              shippingPrice: "Free",
              subtotalText: "Subtotal",
              totalText: "Total",
              checkoutButtonText: "Proceed to Checkout"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        },
        {
          sectionName: "HeroBanner",
          data: {
            builddata: {
              title: "Welcome to StyleShop",
              subtitle: "Your one-stop shop for fashion",
              buttonText: "Shop Now",
              buttonLink: "/products"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        },
      ],
      "login":[
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "StyleShop",
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          },
          sections: [
            {
              sectionName: "Menu",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "menuOpen",
                  type: "boolean",
                  initValue: false
                }
              },
              sections: []
            },
            {
              sectionName: "Routes",
              client: "yes",
              data: {
                builddata: {
                  routes: [
                    { name: "Home", location: "/" },
                    { name: "Products", location: "/products" },
                    { name: "Categories", location: "/categories" },
                    { name: "Profile", location: "/profile", authRequired: true },
                    { name: "My Orders", location: "/orders", authRequired: true }
                  ]
                },
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Search",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "searchQuery",
                  type: "string",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Cart",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Auth",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            }
          ]
        },
        {
          sectionName: "LoginPage",
          client: "yes",
          data: {
            builddata: {
              title: "Welcome to Login Page",
              success:"ready to shop"
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          }
        },
      ],
      "orders": [
        {
          sectionName: "Header",
          data: {
            builddata: {
              title: "StyleShop",
            },
            styles: {},
            state: {
              key: "",
              type: "",
              initValue: ""
            }
          },
          sections: [
            {
              sectionName: "Menu",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "menuOpen",
                  type: "boolean",
                  initValue: false
                }
              },
              sections: []
            },
            {
              sectionName: "Routes",
              client: "yes",
              data: {
                builddata: {
                  routes: [
                    { name: "Home", location: "/" },
                    { name: "Products", location: "/products" },
                    { name: "Categories", location: "/categories" },
                    { name: "Profile", location: "/profile", authRequired: true },
                    { name: "My Orders", location: "/orders", authRequired: true }
                  ]
                },
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Search",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "searchQuery",
                  type: "string",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Cart",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            },
            {
              sectionName: "Auth",
              client: "yes",
              data: {
                builddata: {},
                styles: {},
                state: {
                  key: "",
                  type: "",
                  initValue: ""
                }
              },
              sections: []
            }
          ]
        },
      ],
    } as unknown as { [key: string]: ComponentData[] };

    const componentList = data[slugPath];

    if (!componentList) notFound();

    return (
      <main className="min-h-screen" suppressHydrationWarning>
        {await Promise.all(
          componentList.map((component: ComponentData, idx: number) =>
            renderSection(component, idx.toString())
          )
        )}
      </main>
    );
  } catch (error) {
    console.error('Error in DynamicPage:', error);
    return <div>Error loading components</div>;
  }
}
// ✅ Static paths to generate at build time
export async function generateStaticParams() {
  const staticPaths = [
    "", // homepage `/`
    "products",
    "categories",
    "profile",
    "orders",
    "cart",
    "login",
    "products/product1/detail",
    "blog",
    "not-found"
  ];

  return staticPaths.map((slugPath) => ({
    slug: slugPath === "" ? [] : slugPath.split("/")
  }));
}
