// Dummy data service to replace API calls
const DUMMY_ARTWORKS = [
  {
    id: 1,
    title: "Sunset Over Mountains",
    artistName: "John Smith",
    description: "A beautiful landscape painting capturing the golden hour over mountain ranges.",
    initialPrice: 250,
    currentPrice: 275,
    category: "Landscape",
    medium: "Oil Painting",
    year: "2023",
    image: "/assets/img-01.jpg",
    tags: ["Modern", "Oil Painting", "Vibrant"],
    auctionStartTime: "2024-01-15T10:00:00Z",
    auctionEndTime: "2024-01-20T18:00:00Z",
    currentBid: 275,
    artistImage: "/assets/people-1.jpg",
    artistBio: "John Smith is a renowned landscape artist with over 20 years of experience.",
    artistEmail: "john.smith@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 6,
    title: "Waiting for Approval",
    artistName: "New Artist",
    description: "This artwork is pending admin approval.",
    initialPrice: 150,
    currentPrice: 150,
    category: "Abstract",
    medium: "Acrylic",
    year: "2024",
    image: "/assets/img-06.jpg",
    tags: ["Abstract", "Pending"],
    auctionStartTime: null,
    auctionEndTime: null,
    currentBid: 150,
    artistImage: "/assets/people-2.jpg",
    artistBio: "New artist waiting for approval.",
    artistEmail: "new.artist@example.com",
    approvalStatus: "Pending"
  },
  {
    id: 31,
    title: "Modern Abstract",
    artistName: "Jane Pending",
    description: "A modern abstract piece exploring contemporary themes.",
    initialPrice: 180,
    currentPrice: 180,
    category: "Abstract",
    medium: "Oil Painting",
    year: "2024",
    image: "/assets/img-01.jpg",
    tags: ["Modern", "Abstract", "Contemporary"],
    auctionStartTime: null,
    auctionEndTime: null,
    currentBid: 180,
    artistImage: "/assets/people-3.jpg",
    artistBio: "Jane is a new artist exploring abstract art.",
    artistEmail: "jane.pending@example.com",
    approvalStatus: "Pending"
  },
  {
    id: 32,
    title: "Nature's Beauty",
    artistName: "Mike Newcomer",
    description: "A beautiful landscape painting of a serene lake.",
    initialPrice: 220,
    currentPrice: 220,
    category: "Landscape",
    medium: "Watercolor",
    year: "2024",
    image: "/assets/img-02.jpg",
    tags: ["Nature", "Lake", "Serene"],
    auctionStartTime: null,
    auctionEndTime: null,
    currentBid: 220,
    artistImage: "/assets/people-4.jpg",
    artistBio: "Mike is passionate about nature and landscapes.",
    artistEmail: "mike.newcomer@example.com",
    approvalStatus: "Pending"
  },
  {
    id: 33,
    title: "Urban Expression",
    artistName: "Sarah Street",
    description: "A street art piece expressing urban life and culture.",
    initialPrice: 160,
    currentPrice: 160,
    category: "Street Art",
    medium: "Spray Paint",
    year: "2024",
    image: "/assets/img-03.jpg",
    tags: ["Street Art", "Urban", "Culture"],
    auctionStartTime: null,
    auctionEndTime: null,
    currentBid: 160,
    artistImage: "/assets/people-1.jpg",
    artistBio: "Sarah creates vibrant street art with social messages.",
    artistEmail: "sarah.street@example.com",
    approvalStatus: "Pending"
  },
  {
    id: 34,
    title: "Digital Dreams",
    artistName: "Alex Digital",
    description: "A digital artwork exploring futuristic concepts.",
    initialPrice: 200,
    currentPrice: 200,
    category: "Digital Art",
    medium: "Digital Art",
    year: "2024",
    image: "/assets/img-04.jpg",
    tags: ["Digital", "Futuristic", "Technology"],
    auctionStartTime: null,
    auctionEndTime: null,
    currentBid: 200,
    artistImage: "/assets/people-2.jpg",
    artistBio: "Alex specializes in digital art and futuristic concepts.",
    artistEmail: "alex.digital@example.com",
    approvalStatus: "Pending"
  },
  {
    id: 35,
    title: "Floral Harmony",
    artistName: "Lily Garden",
    description: "A delicate floral painting with watercolor techniques.",
    initialPrice: 140,
    currentPrice: 140,
    category: "Botanical",
    medium: "Watercolor",
    year: "2024",
    image: "/assets/img-05.jpg",
    tags: ["Floral", "Delicate", "Watercolor"],
    auctionStartTime: null,
    auctionEndTime: null,
    currentBid: 140,
    artistImage: "/assets/people-3.jpg",
    artistBio: "Lily creates beautiful botanical artworks.",
    artistEmail: "lily.garden@example.com",
    approvalStatus: "Pending"
  },
  {
    id: 2,
    title: "Abstract Dreams",
    artistName: "Sarah Johnson",
    description: "An abstract piece exploring the depths of human consciousness through vibrant colors.",
    initialPrice: 180,
    currentPrice: 195,
    category: "Abstract",
    medium: "Acrylic",
    year: "2023",
    image: "/assets/img-02.jpg",
    tags: ["Abstract", "Modern", "Colorful"],
    auctionStartTime: "2024-01-16T09:00:00Z",
    auctionEndTime: "2024-01-21T17:00:00Z",
    currentBid: 195,
    artistImage: "/assets/people-2.jpg",
    artistBio: "Sarah Johnson specializes in abstract art and has exhibited in galleries worldwide.",
    artistEmail: "sarah.johnson@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 3,
    title: "Portrait of Wisdom",
    artistName: "Michael Brown",
    description: "A detailed portrait capturing the essence of wisdom and experience.",
    initialPrice: 320,
    currentPrice: 340,
    category: "Portrait",
    medium: "Oil Painting",
    year: "2023",
    image: "/assets/img-03.jpg",
    tags: ["Portrait", "Classical", "Detailed"],
    auctionStartTime: "2024-01-17T11:00:00Z",
    auctionEndTime: "2024-01-22T19:00:00Z",
    currentBid: 340,
    artistImage: "/assets/people-3.jpg",
    artistBio: "Michael Brown is a classical portrait artist known for his attention to detail.",
    artistEmail: "michael.brown@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 4,
    title: "Ocean Waves",
    artistName: "Emily Davis",
    description: "A dynamic seascape showing the power and beauty of ocean waves.",
    initialPrice: 200,
    currentPrice: 220,
    category: "Seascape",
    medium: "Watercolor",
    year: "2023",
    image: "/assets/img-04.jpg",
    tags: ["Seascape", "Watercolor", "Dynamic"],
    auctionStartTime: "2024-01-18T08:00:00Z",
    auctionEndTime: "2024-01-23T16:00:00Z",
    currentBid: 220,
    artistImage: "/assets/people-4.jpg",
    artistBio: "Emily Davis is passionate about marine art and environmental conservation.",
    artistEmail: "emily.davis@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 5,
    title: "Urban Life",
    artistName: "David Wilson",
    description: "A contemporary piece depicting the hustle and bustle of urban life.",
    initialPrice: 150,
    currentPrice: 165,
    category: "Contemporary",
    medium: "Mixed Media",
    year: "2023",
    image: "/assets/img-05.jpg",
    tags: ["Contemporary", "Urban", "Mixed Media"],
    auctionStartTime: "2024-01-19T12:00:00Z",
    auctionEndTime: "2024-01-24T20:00:00Z",
    currentBid: 165,
    artistImage: "/assets/people-1.jpg",
    artistBio: "David Wilson explores contemporary themes through mixed media techniques.",
    artistEmail: "david.wilson@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 7,
    title: "Mountain Vista",
    artistName: "Alex Thompson",
    description: "A breathtaking view of mountain peaks at sunrise.",
    initialPrice: 300,
    currentPrice: 320,
    category: "Landscape",
    medium: "Oil Painting",
    year: "2023",
    image: "/assets/img-07.jpg",
    tags: ["Landscape", "Mountains", "Sunrise"],
    auctionStartTime: "2024-01-20T08:00:00Z",
    auctionEndTime: "2024-01-25T18:00:00Z",
    currentBid: 320,
    artistImage: "/assets/people-2.jpg",
    artistBio: "Alex Thompson specializes in mountain landscapes and nature scenes.",
    artistEmail: "alex.thompson@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 8,
    title: "City Lights",
    artistName: "Maria Garcia",
    description: "A vibrant cityscape showing the energy of urban nightlife.",
    initialPrice: 200,
    currentPrice: 225,
    category: "Urban",
    medium: "Acrylic",
    year: "2023",
    image: "/assets/img-08.jpg",
    tags: ["Urban", "Night", "City"],
    auctionStartTime: "2024-01-21T19:00:00Z",
    auctionEndTime: "2024-01-26T22:00:00Z",
    currentBid: 225,
    artistImage: "/assets/people-3.jpg",
    artistBio: "Maria Garcia captures the essence of urban life through bold colors.",
    artistEmail: "maria.garcia@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 9,
    title: "Floral Dreams",
    artistName: "Lisa Chen",
    description: "An intricate floral composition with delicate brushwork.",
    initialPrice: 180,
    currentPrice: 195,
    category: "Botanical",
    medium: "Watercolor",
    year: "2023",
    image: "/assets/img-09.jpg",
    tags: ["Floral", "Delicate", "Watercolor"],
    auctionStartTime: "2024-01-22T10:00:00Z",
    auctionEndTime: "2024-01-27T16:00:00Z",
    currentBid: 195,
    artistImage: "/assets/people-4.jpg",
    artistBio: "Lisa Chen creates beautiful botanical art with attention to detail.",
    artistEmail: "lisa.chen@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 10,
    title: "Abstract Emotions",
    artistName: "Robert Kim",
    description: "An abstract expression of human emotions through color and form.",
    initialPrice: 220,
    currentPrice: 240,
    category: "Abstract",
    medium: "Mixed Media",
    year: "2023",
    image: "/assets/img-10.jpg",
    tags: ["Abstract", "Emotions", "Expression"],
    auctionStartTime: "2024-01-23T14:00:00Z",
    auctionEndTime: "2024-01-28T20:00:00Z",
    currentBid: 240,
    artistImage: "/assets/people-1.jpg",
    artistBio: "Robert Kim explores the connection between art and human emotions.",
    artistEmail: "robert.kim@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 11,
    title: "Desert Mirage",
    artistName: "Ahmed Hassan",
    description: "A stunning depiction of desert landscapes with mirage effects.",
    initialPrice: 280,
    currentPrice: 295,
    category: "Landscape",
    medium: "Oil Painting",
    year: "2023",
    image: "/assets/img-11.jpg",
    tags: ["Desert", "Mirage", "Landscape"],
    auctionStartTime: "2024-01-24T09:00:00Z",
    auctionEndTime: "2024-01-29T17:00:00Z",
    currentBid: 295,
    artistImage: "/assets/people-2.jpg",
    artistBio: "Ahmed Hassan brings desert landscapes to life with vibrant colors.",
    artistEmail: "ahmed.hassan@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 12,
    title: "Digital Age",
    artistName: "Sophie Martinez",
    description: "A modern interpretation of technology's impact on society.",
    initialPrice: 160,
    currentPrice: 175,
    category: "Contemporary",
    medium: "Digital Art",
    year: "2023",
    image: "/assets/img-12.jpg",
    tags: ["Digital", "Technology", "Modern"],
    auctionStartTime: "2024-01-25T11:00:00Z",
    auctionEndTime: "2024-01-30T19:00:00Z",
    currentBid: 175,
    artistImage: "/assets/people-3.jpg",
    artistBio: "Sophie Martinez creates thought-provoking digital art about modern life.",
    artistEmail: "sophie.martinez@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 13,
    title: "Forest Symphony",
    artistName: "James Wilson",
    description: "A peaceful forest scene with dappled sunlight through trees.",
    initialPrice: 240,
    currentPrice: 255,
    category: "Nature",
    medium: "Oil Painting",
    year: "2023",
    image: "/assets/img-13.jpg",
    tags: ["Forest", "Nature", "Peaceful"],
    auctionStartTime: "2024-01-26T07:00:00Z",
    auctionEndTime: "2024-01-31T18:00:00Z",
    currentBid: 255,
    artistImage: "/assets/people-4.jpg",
    artistBio: "James Wilson finds tranquility in nature's beauty.",
    artistEmail: "james.wilson@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 14,
    title: "Portrait of Time",
    artistName: "Elena Rodriguez",
    description: "A contemplative portrait capturing the passage of time.",
    initialPrice: 320,
    currentPrice: 340,
    category: "Portrait",
    medium: "Oil Painting",
    year: "2023",
    image: "/assets/img-14.jpg",
    tags: ["Portrait", "Time", "Contemplative"],
    auctionStartTime: "2024-01-27T13:00:00Z",
    auctionEndTime: "2024-02-01T21:00:00Z",
    currentBid: 340,
    artistImage: "/assets/people-1.jpg",
    artistBio: "Elena Rodriguez creates powerful portraits that tell stories.",
    artistEmail: "elena.rodriguez@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 15,
    title: "Ocean Depths",
    artistName: "Carlos Silva",
    description: "An underwater scene showing the mysterious beauty of ocean depths.",
    initialPrice: 260,
    currentPrice: 275,
    category: "Marine",
    medium: "Acrylic",
    year: "2023",
    image: "/assets/img-15.jpg",
    tags: ["Ocean", "Underwater", "Marine"],
    auctionStartTime: "2024-01-28T10:00:00Z",
    auctionEndTime: "2024-02-02T18:00:00Z",
    currentBid: 275,
    artistImage: "/assets/people-2.jpg",
    artistBio: "Carlos Silva explores the hidden beauty of marine environments.",
    artistEmail: "carlos.silva@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 16,
    title: "Geometric Harmony",
    artistName: "Yuki Tanaka",
    description: "A precise geometric composition exploring mathematical beauty.",
    initialPrice: 190,
    currentPrice: 205,
    category: "Geometric",
    medium: "Mixed Media",
    year: "2023",
    image: "/assets/img-16.jpg",
    tags: ["Geometric", "Mathematical", "Precise"],
    auctionStartTime: "2024-01-29T15:00:00Z",
    auctionEndTime: "2024-02-03T20:00:00Z",
    currentBid: 205,
    artistImage: "/assets/people-3.jpg",
    artistBio: "Yuki Tanaka combines art with mathematical precision.",
    artistEmail: "yuki.tanaka@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 17,
    title: "Autumn Leaves",
    artistName: "Rachel Green",
    description: "A warm autumn scene with falling leaves in golden hues.",
    initialPrice: 210,
    currentPrice: 225,
    category: "Seasonal",
    medium: "Watercolor",
    year: "2023",
    image: "/assets/img-01.jpg",
    tags: ["Autumn", "Leaves", "Seasonal"],
    auctionStartTime: "2024-01-30T12:00:00Z",
    auctionEndTime: "2024-02-04T19:00:00Z",
    currentBid: 225,
    artistImage: "/assets/people-4.jpg",
    artistBio: "Rachel Green captures the beauty of changing seasons.",
    artistEmail: "rachel.green@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 18,
    title: "Urban Decay",
    artistName: "Marcus Johnson",
    description: "A raw depiction of urban decay and renewal.",
    initialPrice: 170,
    currentPrice: 185,
    category: "Urban",
    medium: "Spray Paint",
    year: "2023",
    image: "/assets/img-02.jpg",
    tags: ["Urban", "Decay", "Street Art"],
    auctionStartTime: "2024-01-31T16:00:00Z",
    auctionEndTime: "2024-02-05T22:00:00Z",
    currentBid: 185,
    artistImage: "/assets/people-1.jpg",
    artistBio: "Marcus Johnson creates powerful street art with social messages.",
    artistEmail: "marcus.johnson@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 19,
    title: "Cosmic Journey",
    artistName: "Dr. Sarah Chen",
    description: "A space-themed artwork exploring the mysteries of the universe.",
    initialPrice: 350,
    currentPrice: 375,
    category: "Space",
    medium: "Digital Art",
    year: "2023",
    image: "/assets/img-03.jpg",
    tags: ["Space", "Cosmic", "Universe"],
    auctionStartTime: "2024-02-01T08:00:00Z",
    auctionEndTime: "2024-02-06T18:00:00Z",
    currentBid: 375,
    artistImage: "/assets/people-2.jpg",
    artistBio: "Dr. Sarah Chen combines science and art in cosmic explorations.",
    artistEmail: "sarah.chen@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 20,
    title: "Meditation",
    artistName: "Priya Patel",
    description: "A serene composition representing inner peace and meditation.",
    initialPrice: 200,
    currentPrice: 215,
    category: "Spiritual",
    medium: "Oil Painting",
    year: "2023",
    image: "/assets/img-04.jpg",
    tags: ["Meditation", "Peace", "Spiritual"],
    auctionStartTime: "2024-02-02T14:00:00Z",
    auctionEndTime: "2024-02-07T20:00:00Z",
    currentBid: 215,
    artistImage: "/assets/people-3.jpg",
    artistBio: "Priya Patel creates art that promotes mindfulness and inner peace.",
    artistEmail: "priya.patel@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 21,
    title: "Industrial Revolution",
    artistName: "Thomas Anderson",
    description: "A historical piece depicting the industrial revolution era.",
    initialPrice: 290,
    currentPrice: 310,
    category: "Historical",
    medium: "Oil Painting",
    year: "2023",
    image: "/assets/img-05.jpg",
    tags: ["Historical", "Industrial", "Revolution"],
    auctionStartTime: "2024-02-03T10:00:00Z",
    auctionEndTime: "2024-02-08T17:00:00Z",
    currentBid: 310,
    artistImage: "/assets/people-4.jpg",
    artistBio: "Thomas Anderson specializes in historical and period art.",
    artistEmail: "thomas.anderson@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 22,
    title: "Wildlife Encounter",
    artistName: "David Peterson",
    description: "A close-up wildlife portrait showing nature's raw beauty.",
    initialPrice: 330,
    currentPrice: 350,
    category: "Wildlife",
    medium: "Oil Painting",
    year: "2023",
    image: "/assets/img-06.jpg",
    tags: ["Wildlife", "Nature", "Animals"],
    auctionStartTime: "2024-02-04T09:00:00Z",
    auctionEndTime: "2024-02-09T19:00:00Z",
    currentBid: 350,
    artistImage: "/assets/people-1.jpg",
    artistBio: "David Peterson captures wildlife in their natural habitats.",
    artistEmail: "david.peterson@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 23,
    title: "Modern Architecture",
    artistName: "Emma Thompson",
    description: "A contemporary architectural study with clean lines and forms.",
    initialPrice: 250,
    currentPrice: 265,
    category: "Architecture",
    medium: "Digital Art",
    year: "2023",
    image: "/assets/img-07.jpg",
    tags: ["Architecture", "Modern", "Clean"],
    auctionStartTime: "2024-02-05T11:00:00Z",
    auctionEndTime: "2024-02-10T20:00:00Z",
    currentBid: 265,
    artistImage: "/assets/people-2.jpg",
    artistBio: "Emma Thompson explores modern architecture through digital art.",
    artistEmail: "emma.thompson@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 24,
    title: "Jazz Night",
    artistName: "Louis Armstrong",
    description: "A vibrant scene capturing the energy of a jazz performance.",
    initialPrice: 220,
    currentPrice: 235,
    category: "Music",
    medium: "Acrylic",
    year: "2023",
    image: "/assets/img-08.jpg",
    tags: ["Jazz", "Music", "Performance"],
    auctionStartTime: "2024-02-06T19:00:00Z",
    auctionEndTime: "2024-02-11T23:00:00Z",
    currentBid: 235,
    artistImage: "/assets/people-3.jpg",
    artistBio: "Louis Armstrong brings musical energy to canvas.",
    artistEmail: "louis.armstrong@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 25,
    title: "Butterfly Garden",
    artistName: "Isabella Flores",
    description: "A colorful garden scene filled with butterflies and flowers.",
    initialPrice: 180,
    currentPrice: 195,
    category: "Botanical",
    medium: "Watercolor",
    year: "2023",
    image: "/assets/img-09.jpg",
    tags: ["Butterflies", "Garden", "Colorful"],
    auctionStartTime: "2024-02-07T13:00:00Z",
    auctionEndTime: "2024-02-12T18:00:00Z",
    currentBid: 195,
    artistImage: "/assets/people-4.jpg",
    artistBio: "Isabella Flores creates enchanting garden scenes.",
    artistEmail: "isabella.flores@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 26,
    title: "Steampunk Scale",
    artistName: "Victor Steampunk",
    description: "A steampunk-inspired mechanical composition.",
    initialPrice: 280,
    currentPrice: 295,
    category: "Steampunk",
    medium: "Mixed Media",
    year: "2023",
    image: "/assets/img-10.jpg",
    tags: ["Steampunk", "Mechanical", "Vintage"],
    auctionStartTime: "2024-02-08T15:00:00Z",
    auctionEndTime: "2024-02-13T21:00:00Z",
    currentBid: 295,
    artistImage: "/assets/people-1.jpg",
    artistBio: "Victor Steampunk creates intricate steampunk artworks.",
    artistEmail: "victor.steampunk@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 27,
    title: "Northern Lights",
    artistName: "Bjorn Eriksson",
    description: "A mesmerizing display of aurora borealis over snowy landscape.",
    initialPrice: 320,
    currentPrice: 340,
    category: "Landscape",
    medium: "Oil Painting",
    year: "2023",
    image: "/assets/img-11.jpg",
    tags: ["Aurora", "Northern Lights", "Snow"],
    auctionStartTime: "2024-02-09T18:00:00Z",
    auctionEndTime: "2024-02-14T24:00:00Z",
    currentBid: 340,
    artistImage: "/assets/people-2.jpg",
    artistBio: "Bjorn Eriksson captures the magic of Nordic landscapes.",
    artistEmail: "bjorn.eriksson@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 28,
    title: "Crystal Dreams",
    artistName: "Amethyst Moon",
    description: "A mystical crystal formation with ethereal lighting.",
    initialPrice: 240,
    currentPrice: 255,
    category: "Fantasy",
    medium: "Digital Art",
    year: "2023",
    image: "/assets/img-12.jpg",
    tags: ["Crystals", "Mystical", "Fantasy"],
    auctionStartTime: "2024-02-10T12:00:00Z",
    auctionEndTime: "2024-02-15T20:00:00Z",
    currentBid: 255,
    artistImage: "/assets/people-3.jpg",
    artistBio: "Amethyst Moon creates mystical and fantasy artworks.",
    artistEmail: "amethyst.moon@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 29,
    title: "Street Market",
    artistName: "Ahmed Al-Rashid",
    description: "A bustling street market scene with vibrant colors and life.",
    initialPrice: 200,
    currentPrice: 215,
    category: "Cultural",
    medium: "Oil Painting",
    year: "2023",
    image: "/assets/img-13.jpg",
    tags: ["Market", "Cultural", "Vibrant"],
    auctionStartTime: "2024-02-11T10:00:00Z",
    auctionEndTime: "2024-02-16T18:00:00Z",
    currentBid: 215,
    artistImage: "/assets/people-4.jpg",
    artistBio: "Ahmed Al-Rashid captures the essence of cultural marketplaces.",
    artistEmail: "ahmed.alrashid@example.com",
    approvalStatus: "Approved"
  },
  {
    id: 30,
    title: "Digital Sunset",
    artistName: "Pixel Artist",
    description: "A retro digital art piece with pixelated sunset aesthetics.",
    initialPrice: 160,
    currentPrice: 175,
    category: "Digital",
    medium: "Pixel Art",
    year: "2023",
    image: "/assets/img-14.jpg",
    tags: ["Pixel Art", "Retro", "Digital"],
    auctionStartTime: "2024-02-12T16:00:00Z",
    auctionEndTime: "2024-02-17T22:00:00Z",
    currentBid: 175,
    artistImage: "/assets/people-1.jpg",
    artistBio: "Pixel Artist specializes in retro digital and pixel art.",
    artistEmail: "pixel.artist@example.com",
    approvalStatus: "Approved"
  }
];

const DUMMY_USERS = [
  {
    id: 1,
    name: "John Smith",
    username: "johnsmith",
    email: "john.smith@example.com",
    role: "Artist",
    bio: "John Smith is a renowned landscape artist with over 20 years of experience.",
    image: "/assets/people-1.jpg",
    phone: "+1-555-0123",
    location: "New York, USA",
    approvalStatus: "Approved"
  },
  {
    id: 6,
    name: "Pending Artist",
    username: "pendingartist",
    email: "pending.artist@example.com",
    role: "Artist",
    bio: "New artist waiting for admin approval.",
    image: "/assets/people-3.jpg",
    phone: "+1-555-0128",
    location: "Boston, USA",
    approvalStatus: "Pending"
  },
  {
    id: 7,
    name: "Jane Pending",
    username: "janepending",
    email: "jane.pending@example.com",
    role: "Artist",
    bio: "Contemporary artist specializing in abstract and modern art. Recently graduated from art school and looking to showcase my work.",
    image: "/assets/people-1.jpg",
    phone: "+1-555-0129",
    location: "Seattle, USA",
    approvalStatus: "Pending"
  },
  {
    id: 8,
    name: "Mike Newcomer",
    username: "mikenewcomer",
    email: "mike.newcomer@example.com",
    role: "Artist",
    bio: "Nature photographer and landscape painter. Passionate about capturing the beauty of the Pacific Northwest.",
    image: "/assets/people-2.jpg",
    phone: "+1-555-0130",
    location: "Portland, USA",
    approvalStatus: "Pending"
  },
  {
    id: 9,
    name: "Sarah Street",
    username: "sarahstreet",
    email: "sarah.street@example.com",
    role: "Artist",
    bio: "Street artist and muralist. Creating vibrant public art that reflects community values and urban culture.",
    image: "/assets/people-3.jpg",
    phone: "+1-555-0131",
    location: "Los Angeles, USA",
    approvalStatus: "Pending"
  },
  {
    id: 10,
    name: "Alex Digital",
    username: "alexdigital",
    email: "alex.digital@example.com",
    role: "Artist",
    bio: "Digital artist and graphic designer. Exploring the intersection of technology and creativity through digital mediums.",
    image: "/assets/people-4.jpg",
    phone: "+1-555-0132",
    location: "San Francisco, USA",
    approvalStatus: "Pending"
  },
  {
    id: 11,
    name: "Lily Garden",
    username: "lilygarden",
    email: "lily.garden@example.com",
    role: "Artist",
    bio: "Botanical artist specializing in watercolor paintings of flowers and plants. Inspired by garden life and natural beauty.",
    image: "/assets/people-1.jpg",
    phone: "+1-555-0133",
    location: "Austin, USA",
    approvalStatus: "Pending"
  },
  {
    id: 12,
    name: "Carlos Mural",
    username: "carlosmural",
    email: "carlos.mural@example.com",
    role: "Artist",
    bio: "Mexican muralist with 10 years of experience in large-scale public art. Focused on cultural heritage and social justice themes.",
    image: "/assets/people-2.jpg",
    phone: "+1-555-0134",
    location: "Chicago, USA",
    approvalStatus: "Pending"
  },
  {
    id: 13,
    name: "Emma Sculpture",
    username: "emmasculpture",
    email: "emma.sculpture@example.com",
    role: "Artist",
    bio: "Sculptor working primarily with metal and stone. Creating abstract forms that explore human emotions and relationships.",
    image: "/assets/people-3.jpg",
    phone: "+1-555-0135",
    location: "Denver, USA",
    approvalStatus: "Pending"
  },
  {
    id: 14,
    name: "David Photography",
    username: "davidphotography",
    email: "david.photography@example.com",
    role: "Artist",
    bio: "Fine art photographer capturing urban landscapes and architectural details. Exhibited in several local galleries.",
    image: "/assets/people-4.jpg",
    phone: "+1-555-0136",
    location: "Miami, USA",
    approvalStatus: "Pending"
  },
  {
    id: 15,
    name: "Maya Ceramics",
    username: "mayaceramics",
    email: "maya.ceramics@example.com",
    role: "Artist",
    bio: "Ceramic artist creating functional and decorative pottery. Inspired by traditional techniques with modern interpretations.",
    image: "/assets/people-1.jpg",
    phone: "+1-555-0137",
    location: "Phoenix, USA",
    approvalStatus: "Pending"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    username: "sarahjohnson",
    email: "sarah.johnson@example.com",
    role: "Artist",
    bio: "Sarah Johnson specializes in abstract art and has exhibited in galleries worldwide.",
    image: "/assets/people-2.jpg",
    phone: "+1-555-0124",
    location: "Los Angeles, USA",
    approvalStatus: "Approved"
  },
  {
    id: 3,
    name: "Michael Brown",
    username: "michaelbrown",
    email: "michael.brown@example.com",
    role: "Artist",
    bio: "Michael Brown is a classical portrait artist known for his attention to detail.",
    image: "/assets/people-3.jpg",
    phone: "+1-555-0125",
    location: "Chicago, USA",
    approvalStatus: "Approved"
  },
  {
    id: 4,
    name: "Emily Davis",
    username: "emilydavis",
    email: "emily.davis@example.com",
    role: "Artist",
    bio: "Emily Davis is passionate about marine art and environmental conservation.",
    image: "/assets/people-4.jpg",
    phone: "+1-555-0126",
    location: "Miami, USA",
    approvalStatus: "Approved"
  },
  {
    id: 5,
    name: "David Wilson",
    username: "davidwilson",
    email: "david.wilson@example.com",
    role: "Artist",
    bio: "David Wilson explores contemporary themes through mixed media techniques.",
    image: "/assets/people-1.jpg",
    phone: "+1-555-0127",
    location: "Seattle, USA",
    approvalStatus: "Approved"
  }
];

const DUMMY_ADMIN = {
  id: "admin-1",
  name: "Admin User",
  role: "Admin",
  image: "https://i.pravatar.cc/300",
  about: "Administrator of the Art Gallery platform",
  skills: ["User Management", "Content Management", "System Administration"],
  email: "admin@artgallery.com",
  phone: "+1-555-0000",
  location: "Art Gallery HQ"
};

// Simulate API delays
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// API simulation functions
export const dummyAPI = {
  // Artworks
  getArtworks: async () => {
    await delay();
    return { data: DUMMY_ARTWORKS };
  },

  getArtworkById: async (id) => {
    await delay();
    const artwork = DUMMY_ARTWORKS.find(art => art.id === parseInt(id));
    if (!artwork) {
      throw new Error('Artwork not found');
    }
    return artwork;
  },

  // Authentication
  login: async (credentials) => {
    await delay();
    return {
      accessToken: "dummy-jwt-token-" + Date.now(),
      user: {
        id: "user-1",
        email: credentials.email,
        displayName: "Dummy User",
        role: "Artist"
      }
    };
  },

  register: async (userData) => {
    await delay();
    return {
      token: "dummy-jwt-token-" + Date.now(),
      user: {
        id: "user-" + Date.now(),
        email: userData.email,
        displayName: userData.displayName,
        role: userData.role
      }
    };
  },

  getMe: async () => {
    await delay();
    return DUMMY_ADMIN;
  },

  // Admin functions
  getPendingArtworks: async () => {
    await delay();
    const pendingArtworks = DUMMY_ARTWORKS.filter(art => art.approvalStatus === 'Pending');
    return { data: pendingArtworks };
  },

  getPendingArtists: async () => {
    await delay();
    const pendingArtists = DUMMY_USERS.filter(user => user.approvalStatus === 'Pending');
    return pendingArtists;
  },

  approveArtwork: async (artworkId) => {
    await delay();
    return { success: true, message: "Artwork approved successfully" };
  },

  rejectArtwork: async (artworkId) => {
    await delay();
    return { success: true, message: "Artwork rejected" };
  },

  approveArtist: async (artistId) => {
    await delay();
    return { success: true, message: "Artist approved successfully" };
  },

  rejectArtist: async (artistId) => {
    await delay();
    return { success: true, message: "Artist rejected" };
  },

  // Artist functions
  getArtistArtworks: async () => {
    await delay();
    return { data: DUMMY_ARTWORKS.slice(0, 3) }; // Return first 3 artworks for artist dashboard
  },

  createArtwork: async (artworkData) => {
    await delay();
    const newArtwork = {
      id: DUMMY_ARTWORKS.length + 1,
      ...artworkData,
      approvalStatus: "Pending"
    };
    DUMMY_ARTWORKS.push(newArtwork);
    return newArtwork;
  },

  updateArtwork: async (artworkId, artworkData) => {
    await delay();
    const index = DUMMY_ARTWORKS.findIndex(art => art.id === parseInt(artworkId));
    if (index !== -1) {
      DUMMY_ARTWORKS[index] = { ...DUMMY_ARTWORKS[index], ...artworkData };
      return DUMMY_ARTWORKS[index];
    }
    throw new Error('Artwork not found');
  },

  deleteArtwork: async (artworkId) => {
    await delay();
    const index = DUMMY_ARTWORKS.findIndex(art => art.id === parseInt(artworkId));
    if (index !== -1) {
      DUMMY_ARTWORKS.splice(index, 1);
      return { success: true };
    }
    throw new Error('Artwork not found');
  },

  // Bid functions
  placeBid: async (bidData) => {
    await delay();
    return { success: true, message: "Bid placed successfully" };
  },

  extendAuction: async (artworkId, duration) => {
    await delay();
    return { success: true, message: "Auction extended successfully" };
  }
};

// Dummy SignalR connection
export const dummySignalR = {
  HubConnectionBuilder: () => ({
    withUrl: () => ({
      withAutomaticReconnect: () => ({
        build: () => ({
          start: () => Promise.resolve(),
          stop: () => Promise.resolve(),
          invoke: () => Promise.resolve(),
          on: () => {},
          off: () => {}
        })
      })
    })
  })
};
