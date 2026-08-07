# Local SEO Strategy

## 1. Branch vs. Service Area Clarification
**Critical Issue:** The website currently blurs the line between physical branches and service areas. The footer lists "Anna Nagar Branch" and "Porur Branch," but these are just service locations.
- **Physical Branches:** Kilpauk, Mangadu.
- **Service Areas:** Anna Nagar, Porur, and 21 others.
- **Action:** Update all frontend UI (specifically the footer and contact page) to clearly label physical locations as "Our Offices/Branches" and the 23 other locations under "Areas We Serve". Falsely claiming physical branches violates Google Business Profile (GBP) guidelines.

## 2. Schema.org for Local Business
We must implement a multi-location `LocalBusiness` schema (specifically `BuildingMaterialsStore` or `HardwareStore`) representing the two true physical locations.

**Kilpauk Branch Schema Details:**
- Street: No. 72, Kilpauk Garden Road
- Locality: Kilpauk, Chennai
- Postal Code: 600010
- Phone: +91 7305777117

**Mangadu Branch Schema Details:**
- Street: No. 343, KK Nagar, Kundrathur Main Road
- Locality: Mangadu, Chennai
- Postal Code: 600122
- Phone: +91 7305777117

## 3. Name, Address, Phone (NAP) Consistency
Ensure the exact formatting of the business name ("Sree Dhanalakshmi Enterprises"), addresses, and phone number (+91 7305777117) are 100% consistent across:
- The website footer/contact page
- Google Business Profiles
- Justdial, Sulekha, IndiaMart, and local directories.

## 4. Service Area Pages Assessment
The site currently has 23 location pages (e.g., `/construction-materials-supplier-in-anna-nagar`).
- **Optimization Strategy:** Ensure these pages are not thin, duplicate content. They should dynamically pull in hyper-local information, nearby landmarks, or specific delivery logistics for that area to ensure uniqueness.
- **Internal Linking:** Ensure these pages are linked systematically (e.g., via a "Service Areas" HTML sitemap or footer block).

## 5. Expansion: Missing High-Value Locations
Evaluate adding service area pages for other booming construction hubs in Chennai not currently covered:
- OMR (Old Mahabalipuram Road) / Sholinganallur
- ECR (East Coast Road)
- Perambur
- Pallavaram
