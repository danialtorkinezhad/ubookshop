export default (props) => {
    if (!props.state.faves) {
      props.state.faves = [];
    }
    let book = props.book;
  
    return (
      <g-cse
        onClick={() => {
          props.state.form = "details";
          props.state.book = book;
          props.refresh();
        }}
        style={{
          height:"400",
          border:"solid lightgray",
          marginTop:"15px",
          borderRadius: "15px",
          backgroundColor: "white",
          boxShadow: "20px 20px 25px " , 
          
        }}
      >
        <img
          className={global.styles.hoverzoom_nofade}
          src={book.imageLink}
          style={{
            borderRadius: "15px 15px 0px 0px",
            height: 250,
            width: 200,
            objectFit: "cover",
          }}
        />
  
        <f-cc
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            paddingTop: 9,
            paddingBottom:0,
           
          }}
         >
          <f-13 style={{ fontFamily: "vrb" , fontWeight:"bold" }}>{book.title}</f-13>
          <f-cc style={{ width: "100%" }}>
            {props.state.faves.includes(props.book.title) ? (
              
              <img
                src="https://irmapserver.ir/research/33/check.png"
                alt=""
                style={{
                  objectFit: "contain",
                  width: 70,
                  marginRight: 5,
                  
                }}
              />
            ) : (
              <img
                src="https://irmapserver.ir/qepal/cart.svg"
                style={{
                  objectFit: "contain",
                  width: 65,
                  marginRight: 5,
                  paddingBottom:"0px"
                }}
              />
            )}
            <c-cc
              style={{
                display: "flex",
                marginTop:"30px",
                padding: 20,
                width: "100%",
              }}
             >
             
                <del style={{ fontSize: 14 , color:"black", fontFamily:"vrb"}}>
                  
                  {(book.price as number).toLocaleString("fa-IR")} تومان
                </del>
                <p style={{color:"green" , fontFamily:"vrb", fontSize:17}}>
                  
                  {((book.price * 0.75) as number).toLocaleString("fa-IR")} تومان
                    
              </p>
              
            </c-cc>
          </f-cc>
        </f-cc>
      </g-cse>
    );
  };