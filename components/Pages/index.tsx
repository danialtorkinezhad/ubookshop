import Component, { PageEl } from "@/components/Libs/Component";
import Copy from "@/components/Libs/Copy";
import Router from "next/router";
import Window from "@/components/Libs/Window";
import TextBox from "@/components/Libs/TextBox";
import Icon2Titles from "@/components/Libs/Icon2Titles";
import Icon3Titles from "@/components/Libs/Icon3Titles";
import WindowFloat from "../Libs/WindowFloat";
import "./css.module.css";
import Block from "./Block";

export default (p) => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {
  let styles = global.styles;
  let sum = 0;
  let count = 0;
  state.faves = Array.from(new Set(state.faves));
  for (let faves of state.faves) {
    let book = props.books.find((ketab) => ketab.title == faves);
    if (book) {
      sum = sum + book.price * 0.75;
    }
    count = count + 1;
  }

  return (
    <div
      style={{
        direction: "rtl",
        minHeight: "11vh",
        backgroundColor: "GrayText",
      }}
    >
      <br-x />

      <c-cc>
        <Window
          title=" سبد خرید "
          style={{
            height: 150,
            width: "97%",
            fontFamily: "vrb",
            backgroundColor: " lightgray",
          }}
        >
          <f-cse style={{ paddingTop: 35 }}>
            <f-cc
              style={{
                backgroundColor: "white",
                height: "60px",
                width: "30%",
                borderRadius: "8px",
                boxShadow: "15px 15px 20px",
              }}
            >
              {" "}
              <img
                src="https://irmapserver.ir/research/77/money.png"
                style={{ width: "3rem" }}
              ></img>{" "}
              &nbsp;{" "}
              <f-20 style={{ fontFamily: "vrb" }}>
                {" "}
                مجموع پرداخت : {sum.toLocaleString("fa-IR")}{" "}
              </f-20>
            </f-cc>

            <f-cc
              style={{
                backgroundColor: "white",
                height: "60px",
                width: "30%",
                borderRadius: "8px",
                boxShadow: "15px 15px 20px",
              }}
            >
              {" "}
              <img
                src="https://irmapserver.ir/research/77/book.png"
                style={{ width: "3rem" }}
              ></img>{" "}
              &nbsp;{" "}
              <f-20 style={{ fontFamily: "vrb" }}>
                {" "}
                تعداد کتاب : {count.toLocaleString("fa-IR")}{" "}
              </f-20>
            </f-cc>
          </f-cse>
        </Window>
      </c-cc>

      {state.form == "details" ? (
        <WindowFloat
          style={{ fontSize: 15, fontFamily: "vrb" }}
          title="اطلاعات کتاب"
          onclose={() => {
            delete state.form;
            refresh();
          }}
        >
          <f-c>
            <f-15>نام کتاب : </f-15>
            <sp-2 />
            <f-15>{state.book.title}</f-15>
          </f-c>

          <f-c>
            <f-15>نویسنده : </f-15>
            <sp-2 />
            <f-15>{state.book.author}</f-15>
          </f-c>

          <f-c>
            <f-15>کشور : </f-15>
            <sp-2 />
            <f-15>{state.book.country}</f-15>
          </f-c>

          <f-c>
            <f-15>زبان : </f-15>
            <sp-2 />
            <f-15>{state.book.language}</f-15>
          </f-c>

          <f-c>
            <f-15>تعداد صحفات : </f-15>
            <sp-2 />
            <f-15>{state.book.pages}</f-15>
          </f-c>

          <g-b
            style={{ backgroundColor: "darkgreen" }}
            onClick={() => {
              if (!state.faves) {
                state.faves = [];
              }

              if (state.faves.includes(state.book.title)) {
                state.faves = state.faves.filter(
                  (item) => item !== state.book.title
                );
                state.form = null;
              } else {
                state.faves.push(state.book.title);
                state.form = null;
              }

              refresh();
            }}
          >
            <f-15 style={{ color: "lightgray", fontFamily: "vrb" }}>
              {" "}
              خرید{" "}
            </f-15>
          </g-b>
        </WindowFloat>
      ) : null}
      <Window
        title={" کتاب ها  "}
        style={{
          minHeight: 200,
          margin: 10,
          width: "calc(100% - 20px)",
          fontFamily: "vrb",
          backgroundColor: " lightgray",
          // backgroundImage: 'url(${ "https://cdn.prod.website-files.com/5f64854a08f25af4fc8763b6/622b2a8c5ae8dd46d414abf1_bookshop.jpg"})'
        }}
      >
        <w-cse style={{ gap: 30 }}>
          {props.books.map((book) => {
            return <Block book={book} state={state} refresh={refresh} />;
          })}
        </w-cse>
      </Window>
    </div>
  );
};

export async function getServerSideProps(context) {
  var session = await global.SSRVerify(context);
  var {
    uid,
    name,
    image,
    imageprop,
    lang,
    cchar,
    unit,
    workspace,
    servid,
    servsecret,
    usedquota,
    quota,
    quotaunit,
    status,
    regdate,
    expid,
    role,
    path,
    devmod,
    userip,
  } = session;

  let books = await global.db.collection("books").find({}).toArray();

  for (let book of books) {
    book.imageLink =
      "https://irmapserver.ir/research/ex/books/" + book.imageLink;
  }

  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      }),
    },
  };
}
