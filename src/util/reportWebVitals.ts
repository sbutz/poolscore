import {
  Metric, onCLS, onINP, onLCP,
} from 'web-vitals';

const reportWebVitals = (onPerfEntry?: Metric) => {
  if (onPerfEntry) {
    onCLS(() => onPerfEntry);
    onINP(() => onPerfEntry);
    onLCP(() => onPerfEntry);
  }
};

export default reportWebVitals;
