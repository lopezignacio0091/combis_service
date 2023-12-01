export const sanitizateFilters = (filters) => {
    let sanitize = [];
    Object.entries(filters).forEach(([_, value]) => {
      if (typeof value === "object") {
        Object.entries(value).forEach(([_, value]) => sanitize.push(value));
        return;
      }
      if (value) {
        sanitize.push(value);
      }
    });
    return sanitize;
  }; 

 