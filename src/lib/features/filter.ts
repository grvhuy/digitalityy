export const filtersConfig = {
  category: [ // filter theo category
    {
      label: "Laptop",
      name: "Laptop",
      filters: [
        {
          label: "Brand",
          name: "brand",
          type: "select",
          options: ["Dell", "HP", "Lenovo", "Asus", "Acer", "MSI"],
        },
        {
          label: "Processor",
          name: "processor",
          type: "select",
          options: ["i3", "i5", "i7"],
        },
        {
          label: "RAM",
          name: "ram",
          type: "select",
          options: ["4GB", "8GB", "16GB", "32GB"],
        },
        {
          label: "Storage",
          name: "storage",
          type: "select",
          options: ["128GB", "256GB", "512GB", "1TB"],
        },
      ],
    },
    {
      label: "Mouse",
      name: "Mouse",
      filters: [
        {
          label: "Brand",
          name: "Brand",
          type: "select",
          options: ["Logitech", "Razer", "SteelSeries", "Corsair"],
        },
        {
          label: "Connection",
          name: "Connection",
          type: "select",
          options: ["Wireless", "Wired"],
        },
        {
          label: "Material",
          name: "material",
          type: "select",
          options: ["ABS", "Metal"],
        },
      ],
    },
    {
      label: "Keyboard",
      name: "keyboard",
      filters: [
        {
          label: "Brand",
          name: "brand",
          type: "select",
          options: ["Logitech", "Razer", "SteelSeries", "Corsair"],
        },
        {
          label: "Type",
          name: "type",
          type: "select",
          options: ["Wireless", "Wired"],
        },
        {
          label: "Switch",
          name: "switch",
          type: "select",
          options: ["Blue", "Red", "Brown", "Black"],
        },
      ],
    
    },
    {
      label: "Headphone",
      name: "Headphone",
      filters: [
        {
          label: "Brand",
          name: "brand",
          type: "select",
          options: ["Logitech", "Razer", "SteelSeries", "Corsair"],
        },
        {
          label: "Type",
          name: "type",
          type: "select",
          options: ["Wireless", "Wired"],
        },
        {
          label: "Battery",
          name: "connection", 
          type: "select",
          options: ["None", "Charged", "Removable"],
        },
      ],
    }
  ],
}

export type TFilter = {
  label: string; // Display name of the filter
  name: string; // ten thuoc tinh spec
  type: string; // loai input
  options: string[]; // gia tri cua spec vi du: i3 i5 i7
}