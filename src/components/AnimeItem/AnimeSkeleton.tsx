import React from "react"
import ContentLoader from "react-content-loader";

const AnimeSkeleton = () => (
  <ContentLoader 
    speed={2}
    width={267}
    height={470}
    viewBox="0 0 267 470"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="-9" y="-42" rx="0" ry="0" width="267" height="470" /> 
  </ContentLoader>
)

export default AnimeSkeleton