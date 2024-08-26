export default (props) => {
    if (!props.state.faves) {
        props.state.faves = [];
    }
    let book = props.book;

    return (
        <c-x
            onClick={() => {
                props.state.form = "details";
                props.state.book = book;
                props.refresh();
            }}
            style={{
                border: "1px solid #000000",
                borderRadius: "10px 10px 10px 10px",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <img
                className={global.styles.hoverzoom_light}
                src={book.imageLink}
                style={{
                    height: 200,
                    width: 150,
                    objectFit: "fill",
                }}
            />

            <f-cc
                style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: 10,
                }}
            >
                <f-8 style={{ fontFamily: "serif" }}>{book.title}</f-8>
                <f-csb style={{ width: "100%" }}>
                    {props.state.faves.includes(props.book.title) ? (
                        <img
                            src="https://irmapserver.ir/research/33/checked.png"
                            alt=""
                            style={{
                                objectFit: "contain",
                                height: 20,
                                width: 20,
                                marginRight: 5,
                            }}
                        />
                    ) : (
                        <img
                            src="https://irmapserver.ir/qepal/cart.svg"
                            style={{
                                objectFit: "contain",
                                height: 20,
                                width: 20,
                                marginRight: 5,
                            }}
                        />
                    )}
                    <c-cc
                        style={{
                            display: "flex",
                            alignItems: "end",
                            padding: 10,
                            width: "100%",
                        }}
                    >
                        <del style={{ fontSize: 11 }}> {(book.price as number).toLocaleString("fa-IR")} تومان</del>
                        <f-13b> {(book.price * 0.7 as number).toLocaleString("fa-IR")}تومان</f-13b>
                    </c-cc>
                </f-csb>
            </f-cc>
        </c-x>
    );
};