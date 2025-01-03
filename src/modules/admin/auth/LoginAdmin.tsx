import { Input, message } from "antd";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import cookiesStore from "../../../plugins/cookiesStore";
import GeneralLoading from "../../../components/base/GeneralLoading";
import { DEFINE_ROUTERS_ADMIN } from "../../../constants/route-mapper";
import authService from "../../../services/authService";

export default function LoginAdmin() {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onHandleSubmit = async () => {
    if (!(form.email && form.password)) {
      message.error("Please enter user name and password");
      return;
    }
    try {
      setLoading(true);
      const rs = await authService.login({
        email: form.email,
        password: form.password,
      });
      cookiesStore.set("access_token", rs.data.accessToken);
      cookiesStore.set("admin", "admin");
      navigate(DEFINE_ROUTERS_ADMIN.home);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <GeneralLoading isLoading={loading} />
      <div className="flex h-full w-full justify-center items-center">
        <section className="h-full">
          <div className="container h-full p-10">
            <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
              <div className="w-full">
                <div className="block rounded-lg bg-white shadow-lg dark:bg-blue-950">
                  <div className="g-0 lg:flex lg:flex-wrap">
                    <div className="px-4 md:px-0 lg:w-full">
                      <div className="md:mx-6 md:p-12">
                        {/* <!--Logo--> */}
                        <div className="text-center">
                          <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                            Admin of Phuong Hoang 2 hotel
                          </h4>
                        </div>

                        <form>
                          <p className="mb-4">Please login to your account</p>
                          {/* <!--email input--> */}
                          <Input
                            type="text"
                            placeholder="User name"
                            className="mb-4"
                            value={form.email}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                onHandleSubmit();
                              }
                            }}
                            onChange={(e) => {
                              setForm((pre) => ({
                                ...pre,
                                email: e.target.value,
                              }));
                            }}
                          ></Input>
                          <Input.Password
                            type="password"
                            placeholder="Password"
                            className="mb-4"
                            value={form.password}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                onHandleSubmit();
                              }
                            }}
                            onChange={(e: any) => {
                              setForm((pre) => ({
                                ...pre,
                                password: e.target.value,
                              }));
                            }}
                          ></Input.Password>
                          <div className="mb-12 pb-1 pt-1 text-center">
                            <button
                              disabled={loading}
                              className="mb-3 bg-pink-900 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-0px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="button"
                              onClick={() => onHandleSubmit()}
                            >
                              Đăng nhập
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
