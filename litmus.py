#!/usr/bin/python

"""
LitmusBi functionalities libraries

Author: Bastin Robins.J
Email : bastinrobins@gmail.com
"""
import json
import urlparse
import pandas as pd
import numpy as np
from torndb import Connection

class Litmus:

	def __init__(self):
		# Configuration settings
		self.__HOST__     = "localhost"
		self.__USER__     = "root"
		self.__PASSWORD__ = "testers"
		self.__DB__       = "litmus_api"

	def connect(self):
		""" Establish connection to mysql database """
		return Connection(self.__HOST__, self.__DB__, user=self.__USER__, password=self.__PASSWORD__)

	def get_query_string(self, url):
		""" Convert url query string into dictionary """
		return json.dumps(urlparse.parse_qs(url))


	def get_csv(self, path, filename):
		""" Read csv file and return pandas dataframes """
		return pd.read_csv(path + filename, parse_dates=True)


	def get_column_names(self, dframe):
		""" Takes dataframes as input and return column names as Litmus """
		return dframe.columns.tolist()



	def convert_dataframe_dict(self, dframe):
		"""
		Takes the dataframe as input convert into dictionary with
		keys as column name and unique column values as list
		for eg: {'State':['Tamilnadu', Kerala], 'Category': ['Total Income'] }
		"""
		response = {}
		for column in dframe.columns.values.tolist():
			response[column] = list(set(dframe[column]))
		return response

	def clean_keys(self, data):
		""" Removes the [] from the python dictionary by replace method """
		t = {}
		for k, v in data.items():
			t[k.replace('[]', '')] = v
		return t
