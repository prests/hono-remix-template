import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';

import CustomButton from '../components/button/CustomButton';

import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';

const meta: MetaFunction = () => [
  { title: 'Remix Hono Template' },
  { name: 'description', content: 'This is a template for setting up a Remix application powered by Hono!' },
];

const loader = ({ context }: LoaderFunctionArgs) => {
  const { APP_NAME } = context.env;

  return json({ APP_NAME });
};

const styles = stylex.create({
  page: {
    display: 'grid',
  },
  section: {
    margin: '3rem auto 0',
    textAlign: 'center',
  },
  title: {
    fontWeight: 800,
    fontSize: '3rem',
    lineHeight: 1,
  },
  counter: {
    margin: '1rem 0',
  },
});

const RootIndexRoute = () => {
  const { APP_NAME } = useLoaderData<typeof loader>();

  const [count, setCount] = useState(0);

  return (
    <main {...stylex.props(styles.page)}>
      <section {...stylex.props(styles.section)}>
        <h1 {...stylex.props(styles.title)}>{APP_NAME}</h1>

        <p {...stylex.props(styles.counter)}>
          <strong>Count:</strong> <span>{count}</span>
        </p>

        <CustomButton onClick={() => setCount(val => val + 1)}>Click Me!</CustomButton>
      </section>
    </main>
  );
};

export default RootIndexRoute;
export { loader, meta };
