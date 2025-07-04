import classNames from 'classnames';
import styles from './FavIcon.module.scss';

type Props = {
  active: boolean;
};

export const FavIcon: React.FC<Props> = ({ active }) => {
  return (
    <>
      <div className={styles['icon-container']}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classNames(styles.icon, {
            [styles['icon--active']]: active,
          })}
          style={{ transform: 'scale(1.5)', transformOrigin: 'center' }}
        >
          <path
            d="M13.8931 3.07357C13.5526 2.73291 13.1483 2.46267 12.7033 2.2783C12.2584 2.09392 11.7814 1.99902 11.2998 1.99902C10.8181 1.99902 10.3412 2.09392 9.89618 2.2783C9.45121 2.46267 9.04692 2.73291 8.70642 3.07357L7.99975 3.78024L7.29309 3.07357C6.60529 2.38578 5.67244 1.99938 4.69975 1.99938C3.72706 1.99938 2.79422 2.38578 2.10642 3.07357C1.41863 3.76137 1.03223 4.69422 1.03223 5.66691C1.03223 6.6396 1.41863 7.57245 2.10642 8.26024L2.81309 8.96691L7.99975 14.1536L13.1864 8.96691L13.8931 8.26024C14.2337 7.91974 14.504 7.51545 14.6884 7.07048C14.8727 6.6255 14.9676 6.14857 14.9676 5.66691C14.9676 5.18525 14.8727 4.70831 14.6884 4.26334C14.504 3.81836 14.2337 3.41408 13.8931 3.07357V3.07357Z"
            stroke={!active ? '#333333' : ''}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
};