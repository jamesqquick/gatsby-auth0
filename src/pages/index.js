import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Navigation } from "../components/nav-bar"

const Index = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const influencers = data.allAirtable.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All Influencers" />
      <Navigation />

      {influencers.map((node) => {
        return (
          <article key={node.recordId}>
            <header>
              <h3>
                <a
                  href={"https://www.twitter.com/" + node.data.handle}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {node.data.name}
                </a>
              </h3>
              <p>{node.data.description}</p>
              {node.data.tags.map((tag, index) => (
                <span className="tag" key={index}>
                  {tag}
                </span>
              ))}
            </header>
          </article>
        )
      })}
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allAirtable {
      nodes {
        recordId
        data {
          name
          handle
          tags
          description
        }
      }
    }
  }
`
