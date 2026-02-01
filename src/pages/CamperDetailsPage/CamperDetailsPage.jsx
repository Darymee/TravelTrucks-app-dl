import React, { useEffect } from 'react';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../components/Loader/Loader';
import Banner from '../../components/Banner/Banner';
import BookingForm from '../../components/BookingForm/BookingForm';
import InfoContent from '../../components/InfoContent/InfoContent';
import PageMeta from '../../components/PageMeta/PageMeta';
import Price from '../../components/Price/Price';
import Modal from '../../components/Modal/Modal';
import {
  getCamperDetails,
  selectCamperDetails,
  selectCamperDetailsError,
  selectCamperDetailsLoading,
} from '../../redux/campersSlice';

import styles from './CamperDetailsPage.module.css';

const CamperDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [modalImage, setModalImage] = React.useState(null);

  const camper = useSelector(state => selectCamperDetails(state, id));
  const isLoading = useSelector(selectCamperDetailsLoading);
  const error = useSelector(selectCamperDetailsError);

  useEffect(() => {
    if (!id) return;

    if (!camper) dispatch(getCamperDetails(id));
  }, [dispatch, id, camper]);

  if (isLoading) return <Loader />;

  const hasError = Boolean(error || !camper);
  const pageTitle = hasError
    ? 'Camper not found | TravelTrucks'
    : `${camper.name} | TravelTrucks`;
  const pageDescription = hasError
    ? 'Camper not found'
    : `Rent ${camper.name} in ${camper.location}`;

  const renderContent = () => {
    if (hasError) {
      const message =
        error || `There is no information about the camper with ID “${id}”`;

      return (
        <>
          <Link to="/catalog" className={styles.backLink}>
            Back to Catalog
          </Link>

          <h2 className={styles.title}>Data unavailable</h2>
          <p className={styles.notFound}>{message}</p>
          <Banner />
        </>
      );
    }

    return (
      <>
        <Link to="/catalog" className={styles.backLink}>
          Back to Catalog
        </Link>
        <h2 className={styles.title}>{camper.name}</h2>
        <div className={styles.infoContainer}>
          <InfoContent
            review={camper.reviews}
            rating={camper.rating}
            location={camper.location}
            reviewsLink="reviews#reviews"
          />
        </div>
        <div className={styles.priceContainer}>
          <Price price={camper.price} />
        </div>
        <ul className={styles.gallery}>
          {(camper.gallery?.length
            ? camper.gallery
            : [{ thumb: '/images/placeholder.svg' }]
          ).map((image, index) => (
            <li key={image.thumb ?? `placeholder-${index}`} className={styles.galleryItem}>
              <button
                type="button"
                className={styles.galleryButton}
                onClick={() =>
                  setModalImage(image.original ?? image.thumb ?? '/images/placeholder.svg')
                }
                aria-label="Open image"
              >
                <img
                  src={image.thumb ?? '/images/placeholder.svg'}
                  alt={`${camper.name} picture ${index + 1}`}
                  className={styles.galleryImage}
                />
              </button>
            </li>
          ))}
        </ul>
        <p className={styles.description}>{camper.description}</p>
        <div className={styles.subNav}>
          <NavLink
            to="features"
            end
            className={({ isActive }) =>
              `${styles.subNavLink} ${isActive ? styles.active : ''}`
            }
          >
            Features
          </NavLink>

          <NavLink
            to="reviews#reviews"
            className={({ isActive }) =>
              `${styles.subNavLink} ${isActive ? styles.active : ''}`
            }
          >
            Reviews
          </NavLink>
        </div>
        <div className={styles.bottomContent}>
          <div className={styles.left}>
            <Outlet />
          </div>
          <div className={styles.right}>
            <BookingForm />
          </div>
        </div>
        <Modal
          isOpen={Boolean(modalImage)}
          onClose={() => setModalImage(null)}
          ariaLabel="Camper image"
        >
          <img src={modalImage} alt="Camper full size" className={styles.modalImage} />
        </Modal>
      </>
    );
  };

  return (
    <>
      <PageMeta title={pageTitle} description={pageDescription} />
      <div className="container">
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </>
  );
};

export default CamperDetailsPage;
