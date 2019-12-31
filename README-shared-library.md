------------------------------------------------------------------------------------------------
How to use mobile header and footer third party library
------------------------------------------------------------------------------------------------
step1: Include CSS

 <link rel="stylesheet" type="text/css" href="https://secure-m.macys.com/assets/styles/styles.css">

 step2: Include javascript 
 Include requirejs path as parameter of src
 <script src="/CE/cemew/scripts/lib/require.js" data-main="/CE/cemew/build/mobileNavLoader-built.js"></script>

 step3: html
    <!-- Container for header-->
    <div id="HeaderContainer"></div>
    <section id="content">
        <div id="mw-region-main-inner">
            <!-- container for side navigation-->
            <div id="mb-j-navigation-container"></div>
            <div id="mb-j-main-content-container">
                <!-- container for search tab-->
                <div id="mb-page-content-container"></div> 
                <!-- container for page body-->
                <!--end of page body-->
            </div>    
    </div>
    </section><!-- Closing body container of CE page!-->
    <div id="CEMobileFooterContainer">
            <div id="footer">
            </div>
    </div>    

------------------------------------------------------------------------------------------------
How to use desktop header and footer third party library
------------------------------------------------------------------------------------------------
step1: Include CSS

 <link rel="stylesheet" href="//secure-netstorage.macys.com/netstorage/css/header-ext-https.css">

 step2: Include javascript 
 Include requirejs path as parameter of src
 <script src="/CE/cemew/scripts/lib/require.js" data-main="/CE/cemew/build/DesktopHeaderFooterLoader-built.js"></script> 
 <script type="text/javascript">
    var macysConfig = {
        headerTarget: "#HeaderContainer",
        footerTarget: "#CEMobileFooterContainer",
        fontBaseUrl: "//www.macys.com",
        fontRootRelativePath: "/euf/assets/themes/standard/fonts/",
        thirdParty:true
      }
      
 </script>

 step3: html
  <!-- Container for header-->
  <div id="HeaderContainer"></div>
  <!-- container for footer -->
  <div id="CEMobileFooterContainer">
  </div>    

