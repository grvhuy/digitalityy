export const filtersConfig = {
  category: [ // filter theo category
    {
      label: "Laptop",
      name: "Laptop",
      filters: [
        {
          label: "Brand",
          name: "Brand",
          type: "select",
          options: ["Dell", "HP", "Lenovo", "Asus", "Acer", "MSI"],
        },
        {
          label: "CPU",
          name: "CPU",
          type: "select",
          options: ["i3", "i5", "i7"],
        },
        {
          label: "RAM",
          name: "RAM",
          type: "select",
          options: ["4GB", "8GB", "16GB", "32GB"],
        },
        {
          label: "Storage",
          name: "Storage",
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
          name: "Material",
          type: "select",
          options: ["ABS", "Metal"],
        },
      ],
    },
    {
      label: "Keyboard",
      name: "Keyboard",
      filters: [
        {
          label: "Brand",
          name: "Brand",
          type: "select",
          options: ["E-Dra", "AKKO", "DareU", "SteelSeries", "Corsair"],
        },
        {
          label: "Type",
          name: "Type",
          type: "select",
          options: ["Wireless", "Wired"],
        },
        {
          label: "Switch",
          name: "Switch",
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
      ],
    },
    {
      label: "Ram",
      name: "Ram",
      filters: [
        {
          label: "Brand",
          name: "Brand",
          type: "select",
          options: ["Kingston", "Corsair", "G.Skill", "Crucial"],
        },
        {
          label: "Storage",
          name: "Storage",
          type: "select",
          options: ["4GB", "8GB", "16GB", "32GB"],
        },
        {
          label: "Type",
          name: "Type",
          type: "select",
          options: ["DDR3", "DDR4", "DDR5"],
        },
      ],
    },
    {
      label: "SSD",
      name: "SSD",
      filters: [
        {
          label: "Brand",
          name: "Brand",
          type: "select",
          options: ["Kingston", "Samsung", "Crucial", "WD"],
        },
        {
          label: "Storage",
          name: "Storage",
          type: "select",
          options: ["128 GB", "256 GB", "512 GB", "1TB"],
        },
        {
          label: "Type",
          name: "Type",
          type: "select",
          options: ["SATA", "NVMe"],
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