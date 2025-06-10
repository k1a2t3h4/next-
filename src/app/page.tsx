import React from 'react';

import {renderSection} from '../utils/renderSection'

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
      // {
      //   "sectionName": "ProductFilterPage",
      //   client: "yes",
      //   "data": {
      //     "builddata": {
      //       "title": "Discover Amazing Products",
      //       "subtitle": "Filter and find exactly what you need"
      //     },
      //     "styles": {
      //       "theme": "gradient",
      //       "animationIntensity": 0.8
      //     },
      //     "state": {
      //       "key": "filterState",
      //       "type": "object",
      //       "initValue": {}
      //     }
      //   },
      //   "sections": [
      //     {
      //       "sectionName": "FilterSidebar",
      //       "client": "yes",
      //       "data": {
      //         "builddata": {
      //           "categories": ["All", "Clothing", "Electronics", "Home", "Beauty"],
      //           "priceRanges": [
      //             {"label": "Under $25", "value": [0,25]},
      //             {"label": "$25 - $50", "value": [25,50]},
      //             {"label": "$50 - $100", "value": [50,100]},
      //             {"label": "Over $100", "value": [100,500]}
      //           ]
      //         },
      //         "styles": {
      //           "bgColor": "rgba(255,255,255,0.1)",
      //           "blur": "8px"
      //         },
      //         "state": {
      //           "key": "sidebarOpen",
      //           "type": "boolean",
      //           "initValue": false
      //         }
      //       },
      //       "sections": []
      //     },
      //     {
      //       "sectionName": "ProductGrid",
      //       "client": "yes",
      //       "data": {
      //         "builddata": {},
      //         "styles": {
      //           "gridType": "masonry",
      //           "hoverEffect": "scaleUp"
      //         },
      //         "state": {
      //           "key": "activeProduct",
      //           "type": "string",
      //           "initValue": ""
      //         }
      //       },
      //       "sections": []
      //     }
      //   ]
      // }
    ];
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
