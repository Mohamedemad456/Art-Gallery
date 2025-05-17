import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImages,
  faTags,
  faUser,
  faSearch,
  faGavel,
  faClock,
  faHistory,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import styles from './GalleryFeatures.module.css';
const features = [
  {
    icon: faImages,
    title: 'Curated Art Collection',
    description: 'Explore a diverse range of high-quality artworks — from portraits to modern masterpieces.',
    color: 'text-blue-600',
  },
  {
    icon: faTags,
    title: 'Thematic Tags',
    description: 'Find artworks easily through tags like "vibrant," "oil painting," or "minimalist."',
    color: 'text-green-600',
  },
  {
    icon: faUser,
    title: 'Talented Artists',
    description: 'Discover styles and stories of both emerging and professional artists.',
    color: 'text-purple-600',
  },
  {
    icon: faSearch,
    title: 'Smart Browsing & Filters',
    description: 'Navigate by artist, category, or tags to find your favorite art.',
    color: 'text-pink-500',
  },
  {
    icon: faGavel,
    title: 'Live Auctions',
    description: 'Join live bidding experiences with real-time updates and transparent pricing.',
    color: 'text-yellow-600',
  },
  {
    icon: faClock,
    title: 'Timed Exhibitions',
    description: 'Fresh displays with limited-time exhibitions and changing highlights.',
    color: 'text-red-500',
  },
  {
    icon: faHistory,
    title: 'Bid History Transparency',
    description: 'View the full bid history and see how each artwork gained value.',
    color: 'text-indigo-500',
  },
  {
    icon: faStar,
    title: 'Featured & Spotlight Art',
    description: 'Enjoy curated pieces selected by our gallery team.',
    color: 'text-amber-500',
  },
];

const GalleryFeatures = () => {
  return (
    <section className={`${styles.fadeIn} px-4 py-12 md:px-16 bg-gray-50`} style={{ backgroundImage: 'url(/assets/Features.jpg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',}}>
      <h2 className="text-4xl font-bold text-center mb-10 text-white">Gallery Features</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
          >
            <FontAwesomeIcon icon={feature.icon} size="2x" className={`mb-4 ${feature.color}`} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalleryFeatures;
