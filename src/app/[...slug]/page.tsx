import { notFound } from 'next/navigation';
import React from 'react';
import {renderSection} from '../../utils/renderSection'
// async function getPagesFromR2() {
//   try {
//     const command = new GetObjectCommand({
//       Bucket: process.env.R2_BUCKET_NAME!,
//       Key: 'pages.json',
//     });

//     const response = await r2Client.send(command);
//     const pagesData = await response.Body?.transformToString();
    
//     if (!pagesData) {
//       throw new Error('Pages data not found');
//     }

//     return JSON.parse(pagesData);
//   } catch (error) {
//     console.error('Error loading pages from R2:', error);
//     throw error;
//   }
// }

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


export default async function DynamicPage(props: PageProps) {
  const { params } = props;
  const { slug } = params;
  const slugPath = (slug || []).join('/');

  try {
    // Get pages data from R2
    const data = {
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

    if (!componentList) {
      notFound();
    }

    // Load components from R2
    return (
      <main className="min-h-screen" suppressHydrationWarning>
        {await Promise.all(
          componentList.map(async (component: ComponentData, idx: number) => renderSection(component,idx.toString())))}
      </main>
    );
  } catch (error) {
    console.error('Error in DynamicPage:', error);
    return <div>Error loading components</div>;
  }
}

export const revalidate = 10000;
