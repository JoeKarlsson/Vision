import React from 'react'
import Layout from '../components/layout'

const AboutPage: React.FC = () => (
	<Layout title="About | Vision a ToDo Tracker for heroes">
		<h1 id="vision">Vision</h1>
		<h2 id="prerequisites">Prerequisites</h2>
		<ul>
			<li>Node.js</li>
			<li>
				Before you begin, you will need a MongoDB Atlas account. You can learn more about creating an Atlas account in
				the <a href="https://docs.atlas.mongodb.com/getting-started/">Atlas Getting Started</a> documentation.
			</li>
		</ul>
		<h2 id="getting-started">Getting Started</h2>
		<h3 id="1-clone-example-repository">1. Clone example repository</h3>
		<pre>
			<code className="lang-sh">
				git clone git@github<span className="hljs-selector-class">.com</span>:JoeKarlsson/Vision
				<span className="hljs-selector-class">.git</span>
				cd Vision
			</code>
		</pre>
		<h3 id="2-update-config">2. Update Config</h3>
		<p>
			Change <code>.env_EXAMPLE</code> to <code>.env</code> and paste in your MongoDB Atlas URI.
		</p>
		<h3 id="3-install-dependencies">3. Install Dependencies</h3>
		<pre>
			<code className="lang-sh">
				npm <span className="hljs-keyword">install</span>
			</code>
		</pre>
		<h3 id="4-run-the-development-server-">4. Run the development server:</h3>
		<pre>
			<code className="lang-sh">
				npm <span className="hljs-keyword">run</span>
				<span className="bash"> dev</span>
				<span className="hljs-comment"># or</span>
				yarn dev
			</code>
		</pre>
		<p>
			Open <a href="http://localhost:3000">http://localhost:3000</a> with your browser to see the result.
		</p>
		<h2 id="learn-more">Learn More</h2>
		<p>To learn more about Next.js, take a look at the following resources:</p>
		<ul>
			<li>
				<a href="https://nextjs.org/docs">Next.js Documentation</a> - learn about Next.js features and API.
			</li>
			<li>
				<a href="https://nextjs.org/learn">Learn Next.js</a> - an interactive Next.js tutorial.
			</li>
		</ul>
		<p>
			You can check out <a href="https://github.com/vercel/next.js/">the Next.js GitHub repository</a> - your feedback
			and contributions are welcome!
		</p>
		<h2 id="deploy-on-vercel">Deploy on Vercel</h2>
		<p>
			The easiest way to deploy your Next.js app is to use the{' '}
			<a href="https://vercel.com/new?utm_medium=default-template&amp;filter=next.js&amp;utm_source=create-next-app&amp;utm_campaign=create-next-app-readme">
				Vercel Platform
			</a>
			from the creators of Next.js.
		</p>
		<p>
			Check out our <a href="https://nextjs.org/docs/deployment">Next.js deployment documentation</a> for more details.
		</p>
		<h3 id="contributing-tldr-">Contributing TLDR;</h3>
		<ol>
			<li>Fork it!</li>
			<li>
				Create your feature branch: <code>git checkout -b my-new-feature</code>
			</li>
			<li>
				Commit your changes: <code>git commit -am &#39;Add some feature&#39;</code>
			</li>
			<li>
				Push to the branch: <code>git push origin my-new-feature</code>
			</li>
			<li>Submit a pull request :D</li>
		</ol>

		<h3 id="license">License</h3>
		<h4 id="-apache-2-0-license-">
			<a href="./LICENSE">Apache 2.0</a>
		</h4>
	</Layout>
)

export default AboutPage
