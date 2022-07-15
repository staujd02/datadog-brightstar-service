import tracer from 'dd-trace';

if (process.env.NODE_ENV !== 'local') {
  tracer.init({
    logInjection: true,
  });
}

export default tracer;
