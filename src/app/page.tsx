
import React from 'react';

import {renderSection} from '../utils/renderSection'

// Get the page list from R2
// async function getPagesFromR2() {
//   const command = new GetObjectCommand({
//     Bucket: R2_BUCKET_NAME,
//     Key: 'pages.json',
//   });

//   const response = await r2Client.send(command);
//   const pagesData = await response.Body?.transformToString();

//   if (!pagesData) throw new Error('Pages data not found');

//   return JSON.parse(pagesData);
// }

// Helper function to render a section and its subsections recursively


export default async function Home() {
  try {
    // const pagesData = await getPagesFromR2();
    const pagesData = [
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
      // {
      //   sectionName: "FeaturedProducts",
      //   data: {
      //     builddata: {
      //       title: "Featured Products",
      //       viewAllText: "View All Products",
      //       viewAllLink: "/products",
      //       maxProducts: 4
      //     },
      //     styles: {},
      //     state: {
      //       key: "",
      //       type: "",
      //       initValue: ""
      //     }
      //   }
      // },
      // {
      //   sectionName: "HeroBanner",
      //   data: {
      //     builddata: {
      //       title: "Welcome to StyleShop",
      //       subtitle: "Your one-stop shop for fashion",
      //       buttonText: "Shop Now",
      //       buttonLink: "/products"
      //     },
      //     styles: {},
      //     state: {
      //       key: "",
      //       type: "",
      //       initValue: ""
      //     }
      //   },
        
      // },
      
    //   {
    //     sectionName: "AddToCartButton",
    //     data: {
    //       builddata: {
    //         title: "Welcome to My Component",
    //         description: "This is a sample component showing how to use data",
    //         items: [
    //           "First item in the list",
    //           "Second item in the list",
    //           "Third item in the list"
    //         ]
    //       },
    //       styles: {},
    //       state: {
    //         key: "",
    //         type: "",
    //         initValue: ""
    //       }
    //     }
    //   },
    //   {
    //   sectionName: "CartItemCount",
    //   data: {
    //     builddata: {
    //       title: "Welcome to My Component",
    //       description: "This is a sample component showing how to use data",
    //       items: [
    //         "First item in the list",
    //         "Second item in the list",
    //         "Third item in the list"
    //       ]
    //     },
    //     styles: {},
    //     state: {
    //       key: "",
    //       type: "",
    //       initValue: ""
    //     }
    //   }
    // },
    // {
    //   sectionName: "test1",
    //   data: {
    //     builddata: {
    //       title: "Welcome to My Component",
    //       description: "This is a sample component showing how to use data",
    //       items: [
    //         "First item in the list",
    //         "Second item in the list",
    //         "Third item in the list"
    //       ]
    //     },
    //     styles: {},
    //     state: {
    //       key: "",
    //       type: "",
    //       initValue: ""
    //     }
    //   }
    // },
    // {
    //   sectionName: "test2",
    //   data: {
    //     builddata: {
    //       title: "Welcome to My Component",
    //       description: "This is a sample component showing how to use data",
    //       items: [
    //         "First item in the list",
    //         "Second item in the list",
    //         "Third item in the list"
    //       ]
    //     },
    //     styles: {},
    //     state: {
    //       key: "",
    //       type: "",
    //       initValue: ""
    //     }
    //   }
    // },
    // {
    //   sectionName: "statevaluechecker",
    //   data: {
    //     builddata: {
    //       title: "Welcome to My Component",
    //       description: "This is a sample component showing how to use data",
    //       items: [
    //         "First item in the list",
    //         "Second item in the list",
    //         "Third item in the list"
    //       ]
    //     },
    //     styles: {},
    //     state: {
    //       key: "",
    //       type: "",
    //       initValue: ""
    //     }
    //   }
    // },  
    // {
    //   sectionName: "authverify",
    //   data: {
    //     builddata: {
    //       title: "Welcome to My Component",
    //       description: "This is a sample component showing how to use data",
    //       items: [
    //         "First item in the list",
    //         "Second item in the list",
    //         "Third item in the list"
    //       ]
    //     },
    //     styles: {},
    //     state: {
    //       key: "",
    //       type: "",
    //       initValue: ""
    //     }
    //   }
    // }
    ];
  //   const command = new GetObjectCommand({
  //     Bucket: R2_BUCKET_NAME_TSX,
  //     Key: `${slugPath}.json`,
  //   });

  //   const response = await r2Client.send(command);
  //   const pageData = await response.Body?.transformToString();
    
  //   if (!pageData) {
  //     notFound();
  //   }

  //   const sections = JSON.parse(pageData);

  //   return (
  //     <div className="dynamic-page">
  //       {sections.map((section: ComponentData, idx: number) => (
  //         <React.Fragment key={idx}>
  //           {renderSection(section, idx.toString())}
  //         </React.Fragment>
  //       ))}
  //     </div>
  //   );
  // } catch (error) {
  //   console.error('Error in DynamicPage:', error);
  //   notFound();
    return (
      <main className="min-h-screen" suppressHydrationWarning>
        {await Promise.all(pagesData.map((section, idx) => renderSection(section, idx.toString())))}
      </main>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    return <div>Failed to load components</div>;
  }
}

export const revalidate = 1000;
