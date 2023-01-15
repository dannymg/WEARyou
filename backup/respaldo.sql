--
-- PostgreSQL database dump
--
 -- Dumped from database version 10.21 (Ubuntu 10.21-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 14.2
 -- Started on 2022-08-14 21:30:07

SET statement_timeout = 0;


SET lock_timeout = 0;


SET idle_in_transaction_session_timeout = 0;


SET client_encoding = 'UTF8';


SET standard_conforming_strings = on;


SELECT pg_catalog.set_config('search_path', '', false);


SET check_function_bodies = false;


SET xmloption = content;


SET client_min_messages = warning;


SET row_security = off;

-- DROP DATABASE wearyou;
-- --
-- -- TOC entry 2913 (class 1262 OID 106521)
-- -- Name: wearyou; Type: DATABASE; Schema: -; Owner: postgres
-- --
 -- CREATE DATABASE wearyou WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C.UTF-8';

ALTER DATABASE wearyou OWNER TO postgres;

\connect wearyou
SET statement_timeout = 0;


SET lock_timeout = 0;


SET idle_in_transaction_session_timeout = 0;


SET client_encoding = 'UTF8';


SET standard_conforming_strings = on;


SELECT pg_catalog.set_config('search_path', '', false);


SET check_function_bodies = false;


SET xmloption = content;


SET client_min_messages = warning;


SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--
 -- CREATE SCHEMA public;

ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 2914 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--
 COMMENT ON SCHEMA public IS 'standard public schema';

--
-- TOC entry 605 (class 1247 OID 114714)
-- Name: enum_notifications_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.enum_notifications_state AS ENUM ('Pendiente', 'Completado', 'Cancelado');


ALTER TYPE public.enum_notifications_state OWNER TO postgres;


SET default_tablespace = '';

--
-- TOC entry 197 (class 1259 OID 106792)
-- Name: clothes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clothes (code character varying(5) NOT NULL,
                                                       brand character varying(30),
                                                                       color character varying(20),
                                                                                       size character varying(20),
                                                                                                      price double precision, iva boolean, clothe_type character varying(25),
                                                                                                                                                                 target_public character varying(255)[], "createdAt" timestamp with time zone NOT NULL,
                                                                                                                                                                                                                                              "updatedAt" timestamp with time zone NOT NULL);


ALTER TABLE public.clothes OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 106800)
-- Name: details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.details (code character varying(10) NOT NULL,
                                                        clothes character varying(5) NOT NULL,
                                                                                     quantity integer, "createdAt" timestamp with time zone NOT NULL,
                                                                                                                                            "updatedAt" timestamp with time zone NOT NULL);


ALTER TABLE public.details OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 106815)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (code character varying(10) NOT NULL,
                                                              date_notification date, state character varying(10),
                                                                                                      "createdAt" timestamp with time zone NOT NULL,
                                                                                                                                           "updatedAt" timestamp with time zone NOT NULL,
                                                                                                                                                                                username character varying(20));


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 106810)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (code character varying(10) NOT NULL,
                                                       amount double precision, date_top date, "createdAt" timestamp with time zone NOT NULL,
                                                                                                                                    "updatedAt" timestamp with time zone NOT NULL,
                                                                                                                                                                         detail_code character varying(10));


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 196 (class 1259 OID 106784)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (username character varying(20) NOT NULL,
                                                          name character varying(50) NOT NULL,
                                                                                     last_name character varying(50),
                                                                                                         birth_date date, phone character varying(20),
                                                                                                                                          direction character varying(255)[], email character varying(254) NOT NULL,
                                                                                                                                                                                                           password character varying(255) NOT NULL,
                                                                                                                                                                                                                                           salt character varying(255) NOT NULL,
                                                                                                                                                                                                                                                                       role character varying(10) NOT NULL,
                                                                                                                                                                                                                                                                                                  "createdAt" timestamp with time zone NOT NULL,
                                                                                                                                                                                                                                                                                                                                       "updatedAt" timestamp with time zone NOT NULL);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 2904 (class 0 OID 106792)
-- Dependencies: 197
-- Data for Name: clothes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.clothes
VALUES ('14555',
        'Levis',
        'Negro',
        'M',
        100,
        NULL,
        'Blusa',
        NULL,
        '2022-08-10 00:28:46.96-05',
        '2022-08-10 00:28:46.96-05');


INSERT INTO public.clothes
VALUES ('30885',
        'Gucci',
        'Azul',
        'M',
        100,
        NULL,
        'Camiseta',
        NULL,
        '2022-08-10 00:28:46.96-05',
        '2022-08-10 00:28:46.96-05');


INSERT INTO public.clothes
VALUES ('12331',
        'Nike',
        'Negro',
        '38',
        30.25,
        NULL,
        'Zapato',
        NULL,
        '2022-08-10 13:39:58.461-05',
        '2022-08-10 13:39:58.461-05');


INSERT INTO public.clothes
VALUES ('13232',
        'Adidas',
        'Negro',
        'L',
        15,
        NULL,
        'Camiseta',
        NULL,
        '2022-08-13 19:57:07.277-05',
        '2022-08-13 19:57:07.277-05');


INSERT INTO public.clothes
VALUES ('21421',
        'Adidas',
        'Rojo',
        '40',
        25,
        NULL,
        'Zapato',
        NULL,
        '2022-08-13 19:57:35.663-05',
        '2022-08-13 19:57:35.663-05');


INSERT INTO public.clothes
VALUES ('31243',
        'Nike',
        'Negro',
        '40',
        25,
        NULL,
        'Zapato',
        NULL,
        '2022-08-13 19:58:46.324-05',
        '2022-08-13 19:58:46.324-05');


INSERT INTO public.clothes
VALUES ('10234',
        'Levi''s',
        'Blanco',
        'M',
        40.25,
        NULL,
        'Camisa',
        NULL,
        '2022-08-13 20:00:55.236-05',
        '2022-08-13 20:00:55.236-05');


INSERT INTO public.clothes
VALUES ('10257',
        'Levi''s',
        'Azul',
        '38',
        40,
        NULL,
        'Jean',
        NULL,
        '2022-08-13 20:02:16.255-05',
        '2022-08-13 20:02:16.255-05');


INSERT INTO public.clothes
VALUES ('21343',
        'Levi''s',
        'Verde',
        'M',
        30,
        NULL,
        'Blusa',
        NULL,
        '2022-08-14 20:50:01.925-05',
        '2022-08-14 20:50:01.925-05');

--
-- TOC entry 2905 (class 0 OID 106800)
-- Dependencies: 198
-- Data for Name: details; Type: TABLE DATA; Schema: public; Owner: postgres
--
 --
-- TOC entry 2907 (class 0 OID 106815)
-- Dependencies: 200
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--
 --
-- TOC entry 2906 (class 0 OID 106810)
-- Dependencies: 199
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--
 --
-- TOC entry 2903 (class 0 OID 106784)
-- Dependencies: 196
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users
VALUES ('widison',
        'Widison',
        'Gonzalez',
        '2002-02-09',
        '0978652309',
        '{"18 de Noviembre y Azuay. Loja, Loja, Ecuador"}',
        'widison@gmail.com',
        '9YBrcEorlwuSV2NG8dRjllw2dWFKrneXUOmq0eMD2bomErIYQs2IYyvFa/pUJGiwfVBTQiw9o6uqQKviHAYFeQ==',
        'nI6hBLaNgnymqtZwqQFLjQ==',
        'client',
        '2022-08-09 19:08:29.688-05',
        '2022-08-09 19:08:29.688-05');


INSERT INTO public.users
VALUES ('danny',
        'Danny',
        'Martinez',
        '2002-02-09',
        '0978652309',
        '{"18 de Noviembre y Azuay. Loja, Loja, Ecuador"}',
        'danny@gmail.com',
        'BFUx2ernjF1OOcCefWe/Ir16KAsauDbfjMcymeON0cYP+CM9J1VWLmnmVC2+NnRXL8/AVkdLmJzAK53dm6nqgQ==',
        'RN1L89aRGz6g1y0w0OiEzg==',
        'client',
        '2022-08-09 20:24:13.713-05',
        '2022-08-09 20:24:13.713-05');


INSERT INTO public.users
VALUES ('admin',
        'admin',
        '',
        '1999-12-31',
        '',
        '{}',
        'admin@example.com',
        'zTAc1L+Iw4AKZlvF0FETwXMOqHNoMfa1neG/KfPblRzws85rvwR0LH2kkBlSiPsAJiC6HH3QDTBxtjDrIRBUmA==',
        'qrk9+tMpugNtKr9K3ceuTg==',
        'admin',
        '2022-08-09 23:28:16.624-05',
        '2022-08-09 23:28:16.624-05');


INSERT INTO public.users
VALUES ('luis',
        'Luis',
        'Martinez',
        '2000-02-25',
        '0987435234',
        '{}',
        'lucho@gmail.com',
        'b0HlEOzEpKmRRjz4DGTzj1u4GYUG4Q4mBWmrRoMozLM1DvUt2+RPPvtqMsbrXcNMy7IabWkaVBsmGmcl3Dq53g==',
        'A6d24g2gPW+U3iv+OEUewA==',
        'client',
        '2022-08-10 13:41:20.391-05',
        '2022-08-10 13:41:20.391-05');


INSERT INTO public.users
VALUES ('juan',
        'Juan',
        'Perez',
        '1990-12-22',
        '0934241232',
        '{}',
        'juan@gmail.com',
        '1ADcu1UAiAOgw/tQ0ybbH3f2dOsgLXwxr4CzNtzgaQSq3UouTFLx4u9vU0P7AalwW0I1//b/Do/POKRjxzASXA==',
        '02DGmyJnY2N9Fi73P+KN5A==',
        'client',
        '2022-08-13 14:13:14.663-05',
        '2022-08-13 14:13:14.663-05');


INSERT INTO public.users
VALUES ('peter',
        'Peter',
        'Parker',
        '1990-07-11',
        '0947246432',
        '{}',
        'peter@gmail.com',
        'RcDmfaz/ojw4zHEQmhiC8z+oLNS43t0/8wQnVmmDo/10RRFabBFntfk//fnnamXgqEEgmkUH7olP+4qxq9QAag==',
        'zxiSQZputu9iZyO3RQZ/7Q==',
        'client',
        '2022-08-14 19:27:21.463-05',
        '2022-08-14 19:27:21.463-05');

--
-- TOC entry 2772 (class 2606 OID 106799)
-- Name: clothes clothes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clothes ADD CONSTRAINT clothes_pkey PRIMARY KEY (code);

--
-- TOC entry 2774 (class 2606 OID 106804)
-- Name: details details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.details ADD CONSTRAINT details_pkey PRIMARY KEY (code,
                                                                         clothes);

--
-- TOC entry 2778 (class 2606 OID 106819)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ADD CONSTRAINT notifications_pkey PRIMARY KEY (code);

--
-- TOC entry 2776 (class 2606 OID 106814)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ADD CONSTRAINT orders_pkey PRIMARY KEY (code);

--
-- TOC entry 2770 (class 2606 OID 106791)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ADD CONSTRAINT users_pkey PRIMARY KEY (username);

--
-- TOC entry 2779 (class 2606 OID 106805)
-- Name: details details_clothes_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.details ADD CONSTRAINT details_clothes_fkey
FOREIGN KEY (clothes) REFERENCES public.clothes(code) ON
UPDATE CASCADE ON
DELETE CASCADE;

--
-- TOC entry 2780 (class 2606 OID 106820)
-- Name: notifications notifications_code_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ADD CONSTRAINT notifications_code_fkey
FOREIGN KEY (code) REFERENCES public.orders(code) ON
UPDATE CASCADE ON
DELETE CASCADE;

--
-- TOC entry 2781 (class 2606 OID 106825)
-- Name: notifications notifications_username_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ADD CONSTRAINT notifications_username_fkey
FOREIGN KEY (username) REFERENCES public.users(username) ON
UPDATE CASCADE ON
DELETE
SET NULL;

-- Completed on 2022-08-14 21:30:09
 --
-- PostgreSQL database dump complete
--
